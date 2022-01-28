import { setCustomProperty } from "./updateCustomProperty.js";
let currentCloud = 0;
var pastCloud = 0;
createClouds();

export function createClouds() {
  const cloudElem = document.createElement("img");
  const worldElem = document.querySelector("[data-world]");

  if (currentCloud < 7 && currentCloud == pastCloud) {
    cloudElem.dataset.cloud = true;
    cloudElem.onload = function () {
      worldElem.appendChild(cloudElem);
    };
    cloudElem.src = "../dino2/imgs/cloud.png";
    cloudElem.classList.add("cloud");
    setCustomProperty(cloudElem, "--top", randomBetween(5, 65));
    //worldElem.appendChild(cloudElem); //append

    currentCloud += 1;
  }
  if (currentCloud > pastCloud) {
    setTimeout(() => {
      pastCloud = currentCloud;

      window.requestAnimationFrame(createClouds);
    }, randomBetween(3000, 7500));
  }
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
