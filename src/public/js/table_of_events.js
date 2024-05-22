// mouse hover event
function mouseHover() {
  document.querySelector("#name").style.backgroundColor = "Red";
}
// onclick event
function onClick() {
  document.querySelector("h1").style.color = "white";
}

// animation event
const row1col2 = document.getElementById("col2");

function animationEvent() {
  col2.style.animation = "mymove 4s 2";
}

row1col2.addEventListener("animationstart", myStartFunction);
row1col2.addEventListener("animationiteration", myRepeatFunction);
row1col2.addEventListener("animationend", myEndFunction);

function myStartFunction() {
  this.innerHTML = "The animation has started";
  this.style.backgroundColor = "pink";
}
function myRepeatFunction() {
  this.innerHTML = "The animation was played again";
  this.style.backgroundColor = "lightblue";
}
function myEndFunction() {
  this.innerHTML = "The animation has completed";
  this.style.backgroundColor = "lightgray";
}

//on Blur Event
document.getElementById("fname").onblur = function () {
  onBlur();
};

function onBlur() {
  alert("Input field lost focus.");
}

// on change Event

document.getElementById("col3Fname").addEventListener("change", onChange);

function onChange() {
  var x = document.getElementById("col3Fname");
  x.value = x.value.toUpperCase();
}
