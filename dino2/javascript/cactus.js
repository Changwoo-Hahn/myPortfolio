import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const cactusElem = document.querySelector("[data-cactus]");
const cactusColCenElem = document.querySelector("[data-cactus-col-center]");
const cactusColLeElem = document.querySelector("[data-cactus-col-left]");
const cactusColRiElem = document.querySelector("[data-cactus-col-right]");
const attackButton = document.querySelector("[data-attack-button]");
const jumpButton = document.querySelector("[data-jump-button]");
const JUMP_SPEED = 0.42;
const GRAVITY = 0.0015;
const CACTUS_FRAME_COUNT = 2; //cactus run animation 동작이 두가지
const FRAME_TIME = 130;
const ATTACK_SPEED = 160;

let isJumping;
let isAttacking;
let cactusFrame;
let currentFrameTime;
let yVelocity;
let attackSpeed;

export function setupCactus() {
  currentFrameTime = 0;
  isJumping = false;
  cactusFrame = 0;
  yVelocity = 0;
  attackSpeed = 420;
  cactusElem.src = "./dino2/imgs/cactus-stationary-1.png";

  setCustomProperty(cactusElem, "--bottom", 0);
  setCustomProperty(cactusColCenElem, "--bottom", 0);
  setCustomProperty(cactusColLeElem, "--bottom", 16.2);
  setCustomProperty(cactusColRiElem, "--bottom", 13.2);
  // document.removeEventListener("keydown", onJump);
  // document.addEventListener("keydown", onJump); //keydown을 하면 onJump 실행
  // document.removeEventListener("keydown", attack);
  // document.addEventListener("keydown", attack);
  ["keydown", "click"].forEach((e) => document.removeEventListener(e, onJump));
  ["keydown", "click"].forEach((e) => document.addEventListener(e, onJump));
  ["keydown", "click"].forEach((e) => document.removeEventListener(e, attack));
  ["keydown", "click"].forEach((e) => document.addEventListener(e, attack));
}
export function updateCactus(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
  attackSpeedScale(delta, speedScale);
}

export function getCactusRect(i) {
  const ATTACK = cactusElem.getBoundingClientRect();
  const CENTER = cactusColCenElem.getBoundingClientRect();
  const LEFT = cactusColLeElem.getBoundingClientRect();
  const RIGHT = cactusColRiElem.getBoundingClientRect();
  const ary = [CENTER, LEFT, RIGHT, ATTACK];

  return ary[i];
}

export function setCactusLose() {
  cactusElem.src = "./dino2/imgs/cactus-gameover.png";
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    cactusElem.src = `./dino2/imgs/cactus-stationary-1.png`; //점프시 애니메이션 프레임
    return;
  }
  if (isAttacking) {
    cactusElem.src = "./dino2/imgs/cactus-attack.png";
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    cactusFrame = (cactusFrame + 1) % CACTUS_FRAME_COUNT; //1,2 를 반복하게 됨 DINO_FRAME_COUNT값에 따라 프레임수 증가 가능
    cactusElem.src = `./dino2/imgs/cactus-run-${cactusFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale; //애니메이션을 점점 빠르게
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(cactusElem, "--bottom", yVelocity * delta);
  incrementCustomProperty(cactusColCenElem, "--bottom", yVelocity * delta);
  incrementCustomProperty(cactusColLeElem, "--bottom", yVelocity * delta);
  incrementCustomProperty(cactusColRiElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(cactusElem, "--bottom") <= 0) {
    setCustomProperty(cactusElem, "--bottom", 0);
    setCustomProperty(cactusColCenElem, "--bottom", 0);
    setCustomProperty(cactusColLeElem, "--bottom", 16.2);
    setCustomProperty(cactusColRiElem, "--bottom", 13.2);
    isJumping = false; //bottom이 0보다 적으면  false
  }
  if (isJumping == null) {
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (isJumping == null) {
    isJumping = false;
  }

  if (e.code !== "Space" || isJumping) {
    if (e.target !== jumpButton || isJumping) {
      return;
    }
  }
  //space 키가 아니면 실행 X

  yVelocity = JUMP_SPEED;
  isJumping = true;
}

function attack(e) {
  isAttacking = false;
  //if (!attackClick) return;
  //e.code !== "KeyA" ||
  //e.target !== attackButton
  if (e.code !== "KeyA" || isJumping) {
    if (e.target !== attackButton || isJumping) {
      return;
    }
  }

  if (e.repeat) return; //공격 반복 금지

  isAttacking = true;

  if (isJumping) {
    isAttacking = false;
  }

  setTimeout(() => {
    //document.addEventListener("keydown", { once: true });
    ["keydown", "click"].forEach((e) =>
      document.addEventListener(e, { once: true })
    );
    isAttacking = false;
  }, attackSpeed); //0.2초 공격 그리고 공격 false
  return isAttacking;
}
export function attackBool() {
  if (isAttacking == null) {
    isAttacking = false;
  }
  return isAttacking;
}
export function isJumpingBool() {
  return isJumping;
}
function attackSpeedScale(delta, speedScale) {
  const sub = delta * speedScale;
  attackSpeed = ATTACK_SPEED - sub;

  return attackSpeed;
}
