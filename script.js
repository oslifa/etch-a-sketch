const canvas = document.querySelector("#canvas");

const MIN_CANVAS_WIDTH = 2;
const MAX_CANVAS_WIDTH = 100;

function setCanvasWidth(width) {
    if (width >= MIN_CANVAS_WIDTH && width <= MAX_CANVAS_WIDTH) {
        canvas.innerHTML = "";
        canvasWidth = width;

        let gridStyle = showGridCheckbox.checked ? "1px solid #808080" : "none";

        for (let i = 1; i <= canvasWidth; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            
            for (let j = 1; j <= canvasWidth; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.style.outline = gridStyle;
                cell.id=`_${j}_${i}`;

                row.appendChild(cell);
            }

            canvas.appendChild(row);
        }
    } else {
        canvasWidthSelector.value = canvasWidth;
    }
}

const showGridCheckbox = document.querySelector("#showGrid");
showGridCheckbox.addEventListener("change", () => showGrid(showGridCheckbox.checked));

let canvasWidth = 32;
setCanvasWidth(canvasWidth);

const canvasWidthSelector = document.querySelector("#canvasWidth");
canvasWidthSelector.addEventListener("change", () => setCanvasWidth(canvasWidthSelector.value));

const canvasColorPicker = document.querySelector("#canvasColor");

function changeCanvasColor(color) {
    let colorRed = color[1] + color[2];
    let colorGreen = color[3] + color[4];
    let colorBlue = color[5] + color[6];

    let bgRed = (0xff - parseInt(colorRed, 16)).toString(16);
    let bgBlue = (0xff - parseInt(colorBlue, 16)).toString(16);
    let bgGreen = (0xff - parseInt(colorGreen, 16)).toString(16);

    canvas.style.backgroundColor = color;
    document.body.style.backgroundColor = `#${bgRed}${bgGreen}${bgBlue}`;
}

changeCanvasColor("#ffffff");
canvasColorPicker.addEventListener("input", () => changeCanvasColor(canvasColorPicker.value));

function showGrid(isShowGrid) {
    if (isShowGrid) {
        document.querySelectorAll(".cell").forEach((cell) => cell.style.outline = "1px solid #808080");
    } else {
        document.querySelectorAll(".cell").forEach((cell) => cell.style.outline = "none");
    }
}

function clearCanvas() {
    document.querySelectorAll(".cell").forEach((cell) => cell.style.background = "none");
}

const clearCanvasBtn = document.querySelector("#clearCanvas");
clearCanvasBtn.addEventListener("click", clearCanvas);

let drawMode = "draw";

function changeDrawMode(mode) {
    drawMode = mode;
}

const drawModeSelector = document.querySelector("#drawMode");
drawModeSelector.addEventListener("input", () => changeDrawMode(drawModeSelector.value))

const drawColorPicker = document.querySelector("#drawColor");

let brushSize = "small";

function changeBrushSize(size) {
    brushSize = size;
}

const brushSizeSelector = document.querySelector("#brushSize");
brushSizeSelector.addEventListener("input", () => changeBrushSize(brushSizeSelector.value))

function draw(cell) {
    if (brushSize === "small") {
        fillCell(cell);
    } else if (brushSize === "big") {
        let cellXCoord = parseInt(cell.id.split("_")[1]);
        let cellYCoord = parseInt(cell.id.split("_")[2]);

        for (let i = -1; i <= 1; i++) {
            if (cellXCoord + i > 0 && cellXCoord + i <= canvasWidth) {
                for (let j = -1; j <= 1; j++) {
                    if (cellYCoord + j > 0 && cellYCoord + j <= canvasWidth) {
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

// VIEW GRID