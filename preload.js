// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var win = require("electron").remote.getCurrentWindow();

document.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const buttons = ["minimize", "maximize", "restore", "close"];

  const sizes = {
    "1": "10",
    "1.25": "12",
    "1.5": "15",
    "1.75": "15",
    "2": "20",
    "2.25": "20",
    "2.5": "24",
    "3": "30",
    "3.5": "30"
  };

  const actions = {
    minimize: () => win.minimize(),
    maximize: () => win.maximize(),
    restore: () =>
      win.isFullScreen() ? win.setFullScreen(false) : win.unmaximize(),
    close: () => win.close()
  };

  document.getElementById("titlebar-buttons").insertAdjacentHTML(
    "afterbegin",
    buttons
      .map(button => {
        let srcset = [];
        for (const size in sizes) {
          srcsetList.push(`icons/${button}-${sizes[size]}.png ${size}x`);
        }
        return `<div class="button" id="titlebar-button-${button}">
          <img class="icon" srcset="${srcsetList.join(", ")}" />
        </div>`;
      })
      .join("")
  );

  for (const type in actions) {
    document
      .getElementById(`titlebar-button-${type}`)
      .addEventListener("click", actions[type]);
  }

  let events = {
    "page-title-updated": () =>
      (document.getElementById("titlebar-content").innerText = document.title),
    "maximize, unmaximize": () =>
      document.body.classList[win.isMaximized() ? "add" : "remove"](
        "maximized"
      ),
    "blur, focus": () =>
      document.body.classList[win.isFocused() ? "remove" : "add"]("blurred"),
    "enter-full-screen, leave-full-screen": () =>
      document.body.classList[win.isFullScreen() ? "add" : "remove"](
        "full-screen"
      )
  };

  for (const event in events) {
    events[event]();
    event.split(", ").forEach(eventSplit => {
      win.on(eventSplit, events[event]);
      window.addEventListener("beforeunload", () => {
        win.removeListener(eventSplit, events[event]);
      });
    });
  }
});
