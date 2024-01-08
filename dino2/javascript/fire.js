import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const fireElem = document.querySelectorAll("[data-fire]");
const worldElem = document.querySelector("[data-world]");
const FIRE_FRAME_TIME = 200;
const FIRE_FRAME_COUNT = 3;

let fireFrame;
let fireCurrentFrameTime;

export function setupFire() {
  fireFrame = 0;
  fireCurrentFrameTime = 0;
  document.querySelectorAll("[data-fire]").forEach((fire) => {
    fire.remove();
  });
}
export function updateFire(delta, speedScale) {
  document.querySelectorAll("[data-fire]").forEach((fire) => {
    incrementCustomProperty(fire, "--right", delta * speedScale * SPEED * -1);
    if (getCustomProperty(fire, "--right") <= -10) {
      fire.remove();
    }
  });

  if (fireCurrentFrameTime >= FIRE_FRAME_TIME && fireElem != null) {
    document.querySelectorAll("[data-fire]").forEach((fire) => {
      fireFrame = (fireFrame + 1) % FIRE_FRAME_COUNT;
      fire.src = `./dino2/imgs/fire-${fireFrame}.png`; //fireElem
      fireCurrentFrameTime -= FIRE_FRAME_TIME;
    });
  }
  fireCurrentFrameTime += delta; //* speedScale 시 게임속도만큼 점진적으로 빨라짐
}

export function createFire() {
  const fire = document.createElement("img");

  fire.dataset.fire = true;
  fire.src = "./dino2/imgs/fire-0.png";
  fire.classList.add("fire");
  setCustomProperty(fire, "--right", 100);
  worldElem.append(fire);
}

export function getFireRects() {
  return [...document.querySelectorAll("[data-fire]")].map((fire) => {
    return fire.getBoundingClientRect();
  });
}
