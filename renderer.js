const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
const close = document.getElementById("close-button");
const min = document.getElementById("min-button");
const max = document.getElementById("max-button");
const BrowserWindow = require("electron");
const win = BrowserWindow;
const iW = document.getElementById("mxr");
// const igif = document.getElementById("previ");
const iG = document.getElementById("mxrG");
const settingsbt = document.getElementById("settingsbt");
const settingsUI = document.getElementById("settingsUI");

// gallery opener (function is broken) //

// gall.addEventListener("click", () => {
//     if(maing.classList.contains("show")) {
//         maing.classList.add("hide");
//         maing.classList.remove("show");
//         main.classList.add("show");
//         main.classList.remove("hide");
//     } else if(maing.classList.contains("hide")) {
//         maing.classList.remove("hide");
//         maing.classList.add("show");
//         main.classList.remove("show");
//         main.classList.add("hide");
//     }
// });

// end //

settingsbt.addEventListener("click", e => {
    if(settingsUI.classList.contains("show")) {
        settingsUI.classList.remove("show");
        settingsUI.classList.add("hide");
    } else if (settingsUI.classList.contains("hide")) {
        settingsUI.classList.remove("hide");
        settingsUI.classList.add("show");
    }
});


document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle');
});
  
// document.getElementById('reset-to-system').addEventListener('click', async () => {
//   await ipcRenderer.invoke('dark-mode:system')
//   document.getElementById('theme-source').innerHTML = 'System'
// });

// close app here //
close.addEventListener("click", e => {
    ipc.send('closeApp');
});
// end //

// minimize app here //
min.addEventListener("click", () => {
    ipc.send('minApp');
});
// end //

// maximizeRestore gallery app here //
max.addEventListener("click", () => {
    ipc.send('maxApp');
});
// end //

ipc.on("changeImx", (et, message) => {
    iW.setAttribute("srcset", "icons/restore-w-10.png 1x, icons/restore-w-12.png 1.25x, icons/restore-w-15.png 1.5x, icons/restore-w-15.png 1.75x, icons/restore-w-20.png 2x, icons/restore-w-20.png 2.25x, icons/restore-w-24.png 2.5x, icons/restore-w-30.png 3x, icons/restore-w-30.png 3.5x");
});

ipc.on("changeIr", (t, message) => {
    iW.setAttribute("srcset", "icons/max-w-10.png 1x, icons/max-w-12.png 1.25x, icons/max-w-15.png 1.5x, icons/max-w-15.png 1.75x, icons/max-w-20.png 2x, icons/max-w-20.png 2.25x, icons/max-w-24.png 2.5x, icons/max-w-30.png 3x, icons/max-w-30.png 3.5x");
});