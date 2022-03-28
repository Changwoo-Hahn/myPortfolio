import { updateGround, setupGround } from "./ground.js";
import {
  updateCactus,
  setupCactus,
  getCactusRect,
  setCactusLose,
  attackBool,
  isJumpingBool,
} from "./cactus.js";
import {
  updateDino,
  setupDino,
  getDinoRects,
  removeDino,
  removeTutoDino,
  setTutoDino,
} from "./dino.js";
import { getFireRects, setupFire, updateFire } from "./fire.js";
import { createObstacles, setupObstacles } from "./obstacles.js";
import { setCustomProperty } from "./updateCustomProperty.js";
import { createClouds } from "./cloud.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.000005; //ground 속도 증가 scale
const cactusElem = document.querySelector("[data-cactus]");
const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]"); //html 확인
const startTitleElem = document.querySelector("[data-title]");
const startScreenElem = document.querySelector("[data-start-screen]");
const startAttackScreenElem = document.querySelector(
  "[data-start-attack-screen]"
);
const cactusTutoElem = document.querySelector("[data-cactus-tuto]");
const jumpButton = document.querySelector("[data-jump-button]");
const attackButton = document.querySelector("[data-attack-button]");
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
//window size가 resize 될때마다 setPixelToWorldScale 작동

let lastTime;
let speedScale;
let score;
let highestScore = 0;
let attackSucceed = false;
let jumpTutorial = false;
let attackTutorial = false;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateCactus(delta, speedScale);
  updateDino(delta, speedScale);
  updateFire(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  attackBool();
  checkAttackDino();
  createObstacles(delta, speedScale);

  if (checkLose()) return handleLose();
  if (checkAttackFire()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}

// document.addEventListener("keydown", setTutorial, { once: true }); //keyboard
// document.addEventListener("click", setTutorial, { once: true }); //button click
["keydown", "click"].forEach((e) =>
  document.addEventListener(e, setTutorial, { once: true })
);
function setTutorial(e) {
  //alert("Hi!");
  jumpTutorial = false;
  attackTutorial = false;

  if (!jumpTutorial && !attackTutorial) {
    if (e.code == "Space" || jumpButton.contains(e.target)) {
      ["keydown", "click"].forEach((e) =>
        document.removeEventListener(e, setTutorial, { once: true })
      );
      //document.removeEventListener("keydown", setTutorial);
      startTitleElem.classList.add("hide"); //제목 지우기
      startAttackScreenElem.classList.remove("hide"); //글자 추가
      startScreenElem.classList.add("hide"); //기존 text 지우기
      setCustomProperty(cactusElem, "--right", 45);
      cactusTutoElem.classList.add("hide"); //hide stationary-0 cactus
      cactusElem.classList.remove("hide"); //unhide cactus-1
      //jump !
      setTimeout(() => {
        jumpTutorial = true;
      }, 550);

      const attackEvent = (e) => {
        if (
          (e.code == "KeyA" || attackButton.contains(e.target)) &&
          jumpTutorial
        ) {
          //document.removeEventListener("keydown", attackEvent);
          ["keydown", "click"].forEach((e) =>
            document.removeEventListener(e, attackEvent)
          );
          cactusElem.src = "./dino2/imgs/cactus-attack.png";
          attackTutorial = true;

          startAttackScreenElem.classList.add("hide"); //remove text

          removeTutoDino();
          setTimeout(() => {
            cactusElem.src = "./dino2/imgs/cactus-stationary-1.png";
            cactusElem.classList.add("cactus-tuto-end");

            setTimeout(() => {
              handleStart();
            }, 1500);
          }, 500);
        }
      };
      //document.addEventListener("keydown", attackEvent);
      ["keydown", "click"].forEach((e) =>
        document.addEventListener(e, attackEvent)
      );
    } else {
      //document.addEventListener("keydown", setTutorial);
      ["keydown", "click"].forEach((e) =>
        document.addEventListener(e, setTutorial)
      );
    }
  }
}

function handleStart() {
  //게임시작
  setHighestScore(score);
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupCactus();
  setupDino();
  setupFire();
  setupObstacles();

  if (attackTutorial) {
    window.requestAnimationFrame(update);
  }
}

function checkLose() {
  if (!isJumpingBool()) {
    var colNum =
      getDinoRects().some((rect) => isCollision(getCactusRect(1), rect)) +
      getFireRects().some((rect) => isCollision(getCactusRect(1), rect));
  } else {
    colNum =
      getDinoRects().some((rect) => isCollision(getCactusRect(0), rect)) +
      getDinoRects().some((rect) => isCollision(getCactusRect(1), rect)) +
      getDinoRects().some((rect) => isCollision(getCactusRect(2), rect)) +
      getFireRects().some((rect) => isCollision(getCactusRect(0), rect)) +
      getFireRects().some((rect) => isCollision(getCactusRect(1), rect)) +
      getFireRects().some((rect) => isCollision(getCactusRect(2), rect));
  }
  if (colNum > 0 && attackBool() == 0 && attackSucceed == 0) {
    return 1;
  } else {
    return 0;
  }
}

function checkAttackDino() {
  if (attackBool()) {
    const cactusRectAttack = getDinoRects().some((rect) =>
      isCollision(getCactusRect(3), rect)
    );

    if (cactusRectAttack) {
      attackSucceed = true;
      removeDino(attackBool());
    } else {
      attackSucceed = false;
    }
  } else {
    attackSucceed = false;
  }
}
function checkAttackFire() {
  if (
    attackBool() == 1 &&
    getFireRects().some((rect) => isCollision(getCactusRect(3), rect)) == 1
  ) {
    return 1;
  } else {
    return 0;
  }
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right && // left +setCuctusColliderWidth()
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}
function setHighestScore(score) {
  const highestScoreElem = document.querySelector("[data-highest-score]");
  if (score > highestScore) {
    highestScore = score;

    highestScoreElem.textContent = Math.floor(highestScore);
  }
  if (localStorage.getItem("highestScore")) {
    highestScore = localStorage.getItem("highestScore");
  }
}
function handleLose() {
  setCactusLose(); //img gameover
  setTimeout(() => {
    //gameover 되더라고 space 를 눌러 바로 재실행이 되는 것을 방지
    startTitleElem.classList.remove("hide");
    startScreenElem.classList.remove("hide");
    startAttackScreenElem.classList.add("hide");
    //document.addEventListener("keydown", setTutorial, { once: true });
    ["keydown", "click"].forEach((e) =>
      document.addEventListener(e, setTutorial, { once: true })
    );
    cactusElem.classList.add("hide");
    cactusTutoElem.classList.remove("hide");
    jumpTutorial = false;
    attackTutorial = false;
    cactusElem.classList.remove("cactus-tuto-end");
    handleStart();
    setTutoDino();
  }, 1700); //1.7초 뒤 반응
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

// function setCuctusColliderWidth() {
//   let cactusRec = getCactusRect();
//   let cactusWidth = 72;
//   let cactusExtraWidth = 22;
//   let newWidthScale;
//   let currentWidth = cactusRec.right - cactusRec.left;
//   //3.272727272727273
//   if (currentWidth / 3.3 != cactusExtraWidth) {
//     newWidthScale = currentWidth / cactusWidth;
//     //console.log("widthchange:" + newWidthScale);
//   }
//   return cactusExtraWidth * newWidthScale;
// }
