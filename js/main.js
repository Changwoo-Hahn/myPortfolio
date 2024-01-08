window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

function addZero(i) {
  //10보다 작을 경우 앞에 0을 붙여준다.
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const dateUnit = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const monthNames = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

timer();

setTimeout(widthChange, 1000);
function timer() {
  var today = new Date();
  date = addZero(today.getDate()); //get date
  dateUnitString = dateUnit(date);
  month = today.getMonth() + 1; //[0] = January 숫자 달을 원하면 +1
  monthN = monthNames[month - 1]; // month name 이 [0]부터 시작하기 때문에 1을 빼주어야함
  year = today.getFullYear();
  milSec = addZero(today.getMilliseconds());
  milliSec = milSec.toString();
  milliSec = milliSec.substr(0, 2);
  currentTime =
    addZero(today.getHours()) +
    ":" +
    addZero(today.getMinutes()) +
    ":" +
    addZero(today.getSeconds()) +
    ":" +
    milliSec;
  //var currentSeconds = today.getSeconds();

  currentDateTime =
    monthN + " " + date + dateUnitString + " " + year + " " + currentTime;

  document.getElementById("current-time1").innerHTML = currentDateTime;
  document.getElementById("current-time2").innerHTML = currentDateTime;
  document.getElementById("current-time3").innerHTML = currentDateTime;
  document.getElementById("current-time4").innerHTML = currentDateTime;
  setTimeout(timer, 10); //(function, milisecond0.001)
}
widthChange(month);
function widthChange(m) {
  //div size depends on months
  if (m == 5) {
    timeBlockWidth(690); //1150
  } else if (m == 6 || m == 7) {
    timeBlockWidth(700); //1165
  } else if (m == 3 || m == 4) {
    timeBlockWidth(850); //1265
  } else if (m == 8) {
    timeBlockWidth(870); //1305
  } else if (m == 1 || m == 10) {
    timeBlockWidth(900); //1365
  } else if (m == 2 || m == 11 || m == 12) {
    timeBlockWidth(1000); //1405
  } else if (m == 9) {
    timeBlockWidth(1045); //1445
  }
}

function timeBlockWidth(w) {
  var timeBlockClass = document.getElementsByClassName("time-block"); //class 로 바꾸기
  document.documentElement.style.setProperty(
    "--time-translateX",
    -1 * (w + 15) + "px"
  );
  // (-1 * (w + 15)).toString()

  for (var i = 0; i < timeBlockClass.length; i++) {
    timeBlockClass[i].style.width = w + "px"; //change block width by months
    timeBlockClass[i].style.animationPlayState = "running";
  }
  //timeBlockClass[i].style.width = w.toString() + "px";

  //document.getElementsByClassName("time-block")
  // const animations = document.querySelectorAll("[data-animation");
  // animations.forEach(animation => {
  //   animation.style.animationPlayState = "running";
  // });
  //(-1 * (w + 15)).toString() + "px"
}
//  Array.prototype.forEach.call(timeBlockClass, function (item) {
//      changeWidth(item);
//   });

// function changeWidth(item) {

//     document.getElementsByClassName("time-block")[item].style.borderColor = "gray";
// }

//document.documentElement.style.setProperty('--time-block-width', '1500px'); //작동
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var divElement = document.getElementById("body-article");
var prevScrollpos = divElement.scrollTop;

var headElement = document.getElementById("head-section");
var bodyElement = document.getElementById("body-section");
var headTop = 0;
//var viewportHeight = 100 + "vh";
var bh = 0; //-119px 기본값
var viewPortHeight = window.innerHeight;
var w = window.innerWidth;

window.addEventListener("resize", (event) => {
  var w = window.innerWidth;
  //const mSize = new Boolean(true);
  viewPortHeight = window.innerHeight;
  //console.log(viewPortHeight);
  if (w < 986) {
    headElement.style.top = 0;
    bodyElement.style.top = 0;
    bodyElement.style.height = "";
  } else {
    headElement.style.top = 0;
    bodyElement.style.top = 0;
    //viewPortHeight = window.innerHeight;
    bodyElement.style.height = viewPortHeight + bh + "px";
  }
  //var heightBody = viewPortHeight + bh;
});

divElement.addEventListener("scroll", (event) => {
  //  output.innerHTML = "Scroll event fired!";
  var currentScrollPos = divElement.scrollTop;
  var scrollHegiht = divElement.scrollHeight - divElement.offsetHeight;
  var scrollPercent = Math.round((currentScrollPos / scrollHegiht) * 100);

  if (prevScrollpos > currentScrollPos) {
    //페이지를 올릴 경우 scroll down
    // 마이너스에서 top 이 0 이 될때까지 더해준다.
    if (headTop < 0) headTop += 15;
    if (headTop > 0 || scrollPercent < 4) headTop = 0;
    //bh 값 -119px
    if (bh > -119) bh -= 15;
    if (bh <= -119 || scrollPercent < 4) bh = -119;
    var heightV = viewPortHeight + bh; //+bh

    bodyElement.style.height = heightV + "px"; //viewPortHeight + bh + "px";
    headElement.style.top = headTop + "px"; // "0";
    bodyElement.style.top = headTop + "px"; // "0";
  } else {
    //페이지를 내릴경우
    //헤더를 페이지 위로 올려보내기 위해 top값을 마이너스 값으로 만든다.

    if (headTop > -108) headTop -= 10;
    if (headTop < -108 || scrollPercent > 96) headTop = -108;

    //bh 값을 0으로 만들어 viewport height을 100%활용
    if (bh < 0) bh += 10;
    if (bh >= 0 || scrollPercent > 96) bh = 0;
    var heightVV = viewPortHeight + bh - 10 + "px"; //-19
    bodyElement.style.height = heightVV; //viewPortHeight + bh + "px";
    headElement.style.top = headTop + "px"; // "-105px";
    bodyElement.style.top = headTop + "px";
  }

  prevScrollpos = currentScrollPos;
  //console.log(heightVV + "bh: " + bh);
});
