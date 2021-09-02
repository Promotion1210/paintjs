const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas 요소의 context를 활용해 canvas 요소 안의 픽셀들을 다룰 수 있음.
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; // canvas 요소는 자체적인 크기 뿐 아니라 픽셀을 다루기 위한 너비와 높이(pixel modifier)를 지정해야 함.
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; // canvas요소의 context의 초기 색상 지정
ctx.fillStyle = INITIAL_COLOR; // canvas요소의 fillStyle의 초기 색상 지정
ctx.lineWidth = 2.5; // canvas요소의 context의 초기 굵기 지정


let painting = false; // painting 변수는 마우스 이벤트에 따라 true / false로 바뀌어야 하므로 let으로 변수지정
let filling = false;

function stopPainting() { // painting = false가 반복되지 않도록 별도로 함수 생성
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; // offset을 이용해 캔버스 내의 마우스 위치 반환 (client는 전체 윈도우에서의 마우스 위치)
  const y = event.offsetY;
  if(!painting) {    
    ctx.beginPath();
    ctx.moveTo(x, y); // 클릭하기 전에 마우스가 떠다니는 곳에 path(선)의 시작점을 만들어 둠 
  } else {
    ctx.lineTo(x, y); // 클릭이 발생하면 moveTo에 저장된 위치부터 클릭이 발생한 위치까지 path(선)를 연결
    ctx.stroke(); // path를 실선으로 표시
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;  
  ctx.strokeStyle = color; // 아래의 색상개체를 클릭하면 해당 개체의 배경색으로 context의 색상 변경
  ctx.fillStyle = color // context의 색상으로 fillStyle(배경색) 저장
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size; // range의 값으로 context의 굵기 변경
}

function handleModeClick() { // paint, fill 버튼을 클릭하면 버튼의 filling 속성과 텍스트를 변경함.
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";    
  }
}

function handleCanvasClick() { // filling이  true일때 canvas를 클릭하면 배경색을 변경함.
  if (filling) { 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  event.preventDefault(); // 마우스 우클릭을 했을 때 contextmenu가 열리는 것을 막음
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image; // a의 href 속성에 URL 저장
  link.download = "PaintJS[🎨]"; // a의 download 속성에 저장될 파일명 지정
  link.click();
}

if(canvas) { // 마우스가 canvas안에 있을 때 동작해야 하므로 조건문 사용 
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
} 

Array.from(colors).forEach(color => color.addEventListener("click", changeColor)); // html의 색상을 배열형식으로 저장한 뒤, 각각의 개체에 대해 changeColor 함수 적용

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick)
}

