document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector("#previ");
  let dragZ = document.getElementById("imgCon");
  let dragZT = document.getElementById("dgt");
  let hdi = document.getElementById("hideimg");

  // First time - there is no thumbnail element, so lets create it
  // const thumbnailElement = document.getElementById("previ");

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      let o = reader.result;
      let fileName = o.value;
      let extension = fileName.split('.').pop();
      function checkFileExtension() {
          if(extension === "webm") {
              if(thumbnailElement.hasAttribute('src')){
                  thumbnailElement.removeAttribute("src");
                  hdi.classList.remove("show");
                  hdi.classList.add("hide");
                  delt.textContent = "NO";
                  if(delt.classList.contains("hide")) {
                      delt.classList.remove('hide');
                      delt.classList.add("show")
                  } else if(delt.classList.contains("show")) {
                      return
                  }
              } else if(!thumbnailElement.hasAttribute('src')) {
                  if(dragZT.classList.contains("hide")) {
                      return;
                  } else if(dragZT.classList.contains("show")) {
                      dragZT.classList.remove("show");
                      dragZT.classList.add("hide");
                  }
                  delt.textContent = "NO";
                  if(delt.classList.contains("hide")) {
                      delt.classList.remove('hide');
                      delt.classList.add("show")
                  } else if(delt.classList.contains("show")) {
                      return
                  }
              }
          } else {
              if(delt.classList.contains("hide")) {
                  dragZT.classList.add('hide');
                  thumbnailElement.setAttribute('src', o);
                  thumbnailElement.classList.remove("hide");
                  thumbnailElement.classList.add("show");
                  hdi.classList.add("show");
                  hdi.classList.remove("hide");
              } else if(delt.classList.contains("show")) {
                  delt.classList.add("hide");
                  delt.classList.remove("show");
                  dragZT.classList.add('hide');
                  thumbnailElement.setAttribute('src', o);
                  thumbnailElement.classList.remove("hide");
                  thumbnailElement.classList.add("show");
                  hdi.classList.add("show");
                  hdi.classList.remove("hide");
              }
          }
      }
      checkFileExtension();
      hdi.addEventListener("click", eeet => {
          if(i.classList.contains("show")) {
              i.classList.add("hide");
              i.classList.remove("show");
          } else if(i.classList.contains("hide")) {
              i.classList.remove("hide");
              i.classList.add("show");
          }
      });
    };
  } else {
      thumbnailElement.setAttribute('src', null);
  }
}  