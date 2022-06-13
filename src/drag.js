const { read } = require("original-fs");

const hdiD = document.createElement("a");
hdiD.setAttribute("class", "hdv");
hdiD.setAttribute("id", "hidev");
hdiD.innerText = "Hide";

// drag file //
document.querySelectorAll(".img.drop-zone").forEach((inputElement) => {
  inputElement.addEventListener("dragover", e => {
    e.preventDefault();
    inputElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach(type => {
    inputElement.addEventListener(type, (e) => {
      inputElement.classList.remove("drop-zone--over");
    });
  });

  inputElement.addEventListener("drop", e => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(inputElement, e.dataTransfer.files[0]);
    }

    inputElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  const hdi = document.getElementById("hideimg");

  // First time - there is no thumbnail element, so lets create it
  // const thumbnailElement = document.getElementById("previ");

  // Show thumbnail for image files
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    let o = reader.result;
    // dragFile = o.value;
    // dragExtension = dragFile.split('.').pop();
    if (document.getElementById("previ")) {
      let iDrem = document.getElementById("previ");
      iDrem.parentNode.removeChild(iDrem);
    };
    if (file.type.startsWith("image/")) {
      var iD = document.createElement("img");
    } else if (file.type.startsWith("video/")) {
      var iD = document.createElement("video");
    } else throw "invalid file type";
    const imgConD = document.getElementById("imgCon");
    iD.setAttribute("class", "drop-zone__input show");
    iD.setAttribute("id", "previ");
    // makes controls appear lol
    // iD.setAttribute("controls", "");
    // makes video autoplay
    iD.setAttribute("autoplay", "");
    iD.setAttribute("loop", "");
    iD.muted = true;
    iD.setAttribute("type", file.type.split(';')[0].replace('data:', ''));
    iD.setAttribute("src", o);
    imgConD.appendChild(iD);
    hdi.setAttribute('class', 'hdi show');
    hdi.title = "hide/show image";
    hdi.addEventListener("click", eeet => {
      if (iD.hasAttribute('src')) {
        if (iD.classList.contains("show")) {
          iD.classList.add("hide");
          hdi.textContent = 'Show';
          iD.classList.remove("show");
        } else if (iD.classList.contains("hide")) {
          hdi.textContent = 'Hide';
          iD.classList.remove("hide");
          iD.classList.add("show");
        }
      } else {
        return;
      }
    });
  };
}