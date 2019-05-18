const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const saveBtn = document.getElementById("jsSave");
const imageloader = document.getElementById("jsLoad");
const toptext = document.getElementById("toptext");
const bottomtext = document.getElementById("bottomtext");
const generateBtn = document.getElementById("jsGenerate");
var img = new Image();

const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// default
ctx.font = "50px Anton";
ctx.strokeStyle = "black";
ctx.fillStyle = "white";

// preload
const initialMeasure = ctx.measureText(toptext.value);

function handleCM(event) {
  event.preventDefault();
}

function resetCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.drawImage(img, 0, 0);
}

function handleColorClick(event) {
  resetCanvas();
  var color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  DrawText();
}

function handleRangeChange(event) {
  resetCanvas();
  const size = event.target.value;
  ctx.font = size + "px Anton";
  DrawText();
}

function handleImage(event) {
  var reader = new FileReader();
  reader.onload = function(event) {
    img = new Image();
    img.onload = function() {
      img.width = canvas.width;
      img.height = canvas.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function DrawText(event) {
  resetCanvas();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 8;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  ctx.strokeText(toptext.value, CANVAS_SIZE / 2, CANVAS_SIZE * 0.1);
  ctx.strokeText(bottomtext.value, CANVAS_SIZE / 2, CANVAS_SIZE * 0.93);
  ctx.fillText(toptext.value, CANVAS_SIZE / 2, CANVAS_SIZE * 0.1);
  ctx.fillText(bottomtext.value, CANVAS_SIZE / 2, CANVAS_SIZE * 0.93);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "Meme Generator";
  link.click();
}

if (canvas) {
  canvas.addEventListener("contextmenu", handleCM);
}
if (imageloader) {
  imageloader.addEventListener("change", handleImage);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (generateBtn) {
  generateBtn.addEventListener("click", DrawText);
}
