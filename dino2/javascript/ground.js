import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

export function setupGround() {
  setCustomProperty(groundElems[0], "--right", 0);
  setCustomProperty(groundElems[1], "--right", 300); //css 에서 ground width 을 300으로 설정함
}

export function updateGround(delta, speedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--right", delta * speedScale * SPEED * -1);

    if (getCustomProperty(ground, "--right") <= -300) {
      incrementCustomProperty(ground, "--right", 600);
      //앞의 ground가 -300도달시 해당 ground 를 뒤로 배치
    }
  });
}
