window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

function addZero(i) {
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
widthChange(month);
setTimeout(widthChange, 1000);
function timer() {
  var today = new Date();
  date = addZero(today.getDate()); //get date
  dateUnitString = dateUnit(date);
  month = today.getMonth() + 1; //[0] = January 숫자 달을 원하면 +1
  monthN = monthNames[month - 1];
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

function widthChange(m) {
  //div size depends on months
  if (m == 5) {
    timeBlockWidth(1150); //1045
  } else if (m == 6 || m == 7) {
    timeBlockWidth(1165);
  } else if (m == 3 || m == 4) {
    timeBlockWidth(1265);
  } else if (m == 8) {
    timeBlockWidth(1305);
  } else if (m == 1 || m == 10) {
    timeBlockWidth(1365); //1260
  } else if (m == 2 || m == 11 || m == 12) {
    timeBlockWidth(1405);
  } else if (m == 9) {
    timeBlockWidth(1445);
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
