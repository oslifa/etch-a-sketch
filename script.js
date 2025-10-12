const canvas = document.querySelector("#canvas");

function setCanvasWidth(width) {
    for (let i = 1; i <= width; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        
        for (let j = 1; j <= width; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id=`_${i}_${j}`;

            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}

let canvasWidth = 32;
setCanvasWidth(canvasWidth);

const canvasColorPicker = document.querySelector("#canvasColor");
const drawColorPicker = document.querySelector("#drawColor");

function changeCanvasColor(color) {
    canvas.style.backgroundColor = color;
}

canvasColorPicker.addEventListener("input", (e) => changeCanvasColor(e.target.value));

let drawMode = "draw";

function changeDrawMode(mode) {
    drawMode = mode;
}

const drawModeSelector = document.querySelector("#drawMode");
drawModeSelector.addEventListener("input", (e) => changeDrawMode(e.target.value))

let brushSize = "big";

function changeBrushSize(size) {
    brushSize = size;
}

const brushSizeSelector = document.querySelector("#brushSize");
brushSizeSelector.addEventListener("input", (e) => changeBrushSize(e.target.value))

function draw(cell) {
    if (brushSize === "small") {
        fillCell(cell);
    } else if (brushSize === "big") {
        let cellXCoord = parseInt(cell.id.split("_")[1]);
        let cellYCoord = parseInt(cell.id.split("_")[2]);

        for (let i = -1; i <= 1; i++) {
            if (cellXCoord + i > 0 && cellXCoord <= canvasWidth) {
                for (let j = -1; j <= 1; j++) {
                    if (cellYCoord + i > 0 && cellYCoord <= canvasWidth) {
                        fillCell(document.querySelector(`#_${cellXCoord + i}_${cellYCoord + j}`));
                    }
                }
            }
        }
    }

}

function fillCell(cell) {
    if (drawMode === "draw") {
        cell.style.backgroundColor = drawColorPicker.value;
    } else if (drawMode === "erase") {
        cell.style.background = "none";
    } else if (drawMode === "rainbow") {
        cell.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
    }
}

let isMousedown = false;

function mousedownHandler(event) {
    event.preventDefault();
    isMousedown = true;
    draw(event.target);
}

function mouseupHandler() {
    isMousedown = false;
}

function mouseoverHandler(event) {
    if (isMousedown && event.target.classList.contains("cell")) {
        draw(event.target);
    }
}

canvas.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
canvas.addEventListener("mouseover", mouseoverHandler);

function clearCanvas() {
    document.querySelectorAll(".cell").forEach((cell) => cell.style.background = "none");
}

const clearCanvasBtn = document.querySelector("#clearCanvas");
clearCanvasBtn.addEventListener("click", clearCanvas);

// VIEW GRID