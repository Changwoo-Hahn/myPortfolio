import { setCustomProperty } from "./updateCustomProperty.js";
const INTERVAL_MIN = 800;
const INTERVAL_MAX = 1500;
const worldElem = document.querySelector("[data-world]");

let nextObstacleTime;

export function setupObstacles() {
  nextObstacleTime = INTERVAL_MIN;
}

export function createObstacles(delta, speedScale) {
  var addTime = 0;
  if (addTime > 0) {
    addTime = 0;
  }
  if (nextObstacleTime <= 0) {
    let pattern = randomBetween(0, 99);
    //console.log("pattern:" + pattern);
    if (pattern < 40) {
      dinoPattern();
    } else if (pattern >= 40 && pattern < 80) {
      firePattern();
    } else if (pattern >= 80 && pattern < 90) {
      return null;
    } else if (pattern >= 90 && pattern < 95) {
      dinoPattern();
      setTimeout(() => {
        firePattern();
        addTime = 300;
      }, 300);
    } else if (pattern >= 95 && pattern < 100) {
      dinoPattern();
      setTimeout(() => {
        dinoPattern();
        //addTime = 200;
      }, 400);
    }
    //일정 확률로 dinoPattern(), firePatter() etc 생성
    nextObstacleTime =
      randomBetween(INTERVAL_MIN + addTime, INTERVAL_MAX) / speedScale;
  }
  nextObstacleTime -= delta;
}
function dinoPattern() {
  const dino = document.createElement("img"); //html div 추가

  dino.dataset.dino = true; //document.querySelectorAll("[data-dino]");를 가능하게 해줌
  dino.src = "./dino2/imgs/dino-stationary.png";
  dino.classList.add("dino"); //Dino 클래스 추가
  setCustomProperty(dino, "--right", 100); //100%
  worldElem.append(dino);
}
function firePattern() {
  const fire = document.createElement("img");

  fire.dataset.fire = true;
  fire.src = "./dino2/imgs/fire-0.png";
  fire.classList.add("fire");
  setCustomProperty(fire, "--right", 100);
  worldElem.append(fire);
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
