let appendSec = document.getElementById("sec");
let appendMillisec = document.getElementById("millisec");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");

let counting = false;

var startTime;
var elapsedTime = 0;
var timerInterval;

resetBtn.addEventListener("click", function () {
	counting = false;
	clearInterval(timerInterval);
	appendSec.innerHTML = "00s";
	appendMillisec.innerHTML = "00";
})

startBtn.addEventListener("click", function () {
	if (counting === false) {
		counting = true;
		startTime = Date.now() - elapsedTime;
		timerInterval = setInterval(updateTimer, 10);
		startBtn.className = "btn btn btn-info active btn-lg"; //change the color of the start button to blue when time is counting; a signal of start
		resetBtn.disabled = true; //disable the function of the reset button when time is counting
	} else {
		counting = false;
		clearInterval(timerInterval);
		startBtn.className = "btn btn btn-success active btn-lg"; //change the color of the start button back to green when time stops counting; a signal of stop
		resetBtn.disabled = false; //able the function of reset button when time stops counting
	}
})

function updateTimer() {
  var currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  var seconds = Math.floor(elapsedTime / 1000);
  var milliseconds = Math.floor(elapsedTime % 100);
  appendSec.innerHTML = padZeroes(seconds, 2)+"s";
  appendMillisec.innerHTML = padZeroes(milliseconds, 2);
}

function padZeroes(num, length) {
  var padded = num.toString();
  while (padded.length < length) {
    padded = "0" + padded;
  }
  return padded;
}