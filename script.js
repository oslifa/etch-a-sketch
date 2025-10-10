const canvasWidth = parseInt(prompt("Enter the canvas height/width in pixels: "));

const canvas = document.querySelector("#canvas");

for (let i = 1; i <= canvasWidth; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    
    for (let j = 1; j <= canvasWidth; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        row.appendChild(cell);
    }

    canvas.appendChild(row);
}

// FLEX ROWS AND CELLS

// highlight cell on hover, draw cell with colour when mouse clicked

function drawCell(cell) {
    cell.style.backgroundColor = "blue";
}

let isMousedown = false;

function mousedownHandler(event) {
    event.preventDefault();
    isMousedown = true;
    drawCell(event.target);
}

function mouseupHandler() {
    isMousedown = false;
}

function mouseoverHandler(event) {
    if (isMousedown && event.target.classList.contains("cell")) {
        drawCell(event.target);
    }
}

canvas.addEventListener("mousedown", mousedownHandler);

document.addEventListener("mouseup", mouseupHandler);

canvas.addEventListener("mouseover", mouseoverHandler);