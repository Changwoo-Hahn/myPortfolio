import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05; //same speed as a ground speed

const worldElem = document.querySelector("[data-world]");

const cactusElem = document.querySelector("[data-cactus]");

export function setupDino() {
  //nextDinoTime = DINO_INTERVAL_MIN;
  document.querySelectorAll("[data-dino]").forEach((dino) => {
    dino.remove();
  });
}

export function updateDino(delta, speedScale) {
  document.querySelectorAll("[data-dino]").forEach((dino) => {
    incrementCustomProperty(dino, "--right", delta * speedScale * SPEED * -1);
    if (getCustomProperty(dino, "--right") <= -10) {
      dino.remove();
    }
  });

  checkCactusJump();
}

export function removeDino(bool) {
  document.querySelectorAll("[data-dino]").forEach((dino) => {
    if (bool == 1) {
      if (getCustomProperty(dino, "--right") <= 8) {
        if (dino.classList.contains("dino-tutorial")) {
          dino.classList.remove("dino-tutorial");
          dino.classList.add("dino");
        }
        dino.classList.remove("dino");
        dino.classList.add("deadDino");
        dino.removeAttribute("data-dino");
        setCustomProperty(
          dino,
          "--deg",
          randomNumberBetween(850, 1100) + "deg"
        );
        setCustomProperty(
          dino,
          "--ddBottom",
          randomNumberBetween(-3, 70) + "%"
        );
        setCustomProperty(dino, "--ddRight", randomNumberBetween(5, 70) + "%");

        setTimeout(() => {
          dino.remove();
        }, 500);
      }
    }
  });
}
export function removeTutoDino() {
  const tutoDino = document.querySelector("[data-dino]");

  tutoDino.classList.remove("dino-tutorial");
  tutoDino.classList.add("deadDino");
  //tutoDino.removeAttribute("data-dino");
  setCustomProperty(tutoDino, "--deg", 1000 + "deg");
  setCustomProperty(tutoDino, "--ddBottom", 45 + "%");
  setCustomProperty(tutoDino, "--ddRight", 90 + "%");

  setTimeout(() => {
    tutoDino.classList.add("hide");
  }, 500);
}
export function setTutoDino() {
  const dino = document.createElement("img"); //html div 추가

  dino.dataset.dino = true; //document.querySelectorAll("[data-dino]");를 가능하게 해줌
  dino.src = "./dino2/imgs/dino-stationary.png";
  dino.classList.add("dino-tutorial"); //Dino 클래스 추가

  worldElem.append(dino);
}
export function getDinoRects() {
  return [...document.querySelectorAll("[data-Dino]")].map((dino) => {
    return dino.getBoundingClientRect();
  });
}

export function createDino() {
  const dino = document.createElement("img"); //html div 추가

  dino.dataset.dino = true; //document.querySelectorAll("[data-dino]");를 가능하게 해줌
  dino.src = "./dino2/imgs/dino-stationary.png";
  dino.classList.add("dino"); //Dino 클래스 추가
  setCustomProperty(dino, "--right", 100); //100%
  worldElem.append(dino);
}

export function checkCactusJump() {
  if (getCustomProperty(cactusElem, "--bottom") > 0) {
    document.querySelectorAll("[data-dino]").forEach((dino) => {
      const dis = getCustomProperty(dino, "--right") - 1;
      if (dis < 3.3 && dis > 0) {
        dino.classList.add("dinoJump");
      }
    });
  }
}
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //math.random() 은 0-1사이 값을 반환
}
