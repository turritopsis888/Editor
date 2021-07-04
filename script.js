const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



const updateSizes = () => {
    canvas.width = innerWidth - 30;
    canvas.height = innerHeight - 150;
    palette.style.width = innerWidth - 250;
}

updateSizes();

window.onresize = updateSizes;

const drawLine = (x1, y1, x2, y2) => {
    drawCircle(x1, y1, ctx.lineWidth / 2)
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    drawCircle(x2, y2, ctx.lineWidth / 2)
} 

let xLast, yLast, mouseDown;

 
canvas.onmousemove = e => {
    if ((xLast || yLast) && mouseDown) {
        drawLine(xLast, yLast, e.layerX, e.layerY)
    }
    xLast = e.layerX;
    yLast = e.layerY;
} 

canvas.onmousedown = () => mouseDown = true;
canvas.onmouseup = () => mouseDown = false;

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

clearBtn.onclick = clearCanvas;

const setLineWidth = int => ctx.lineWidth = int;

widthRange.onchange = () => setLineWidth(+widthRange.value);

const drawCircle = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 7);
    ctx.fill();
}

const buildPalette = (rows, columns, width, height) => {
    let html = '';

    for (let i = 0; i < rows; i++) {
        html += '<tr>'

        for (let j = 0; j < columns; j++) {
            html += `<td style="background: hsl(${360 / columns * j}, 100%, ${100 - 100 / (rows + 2) * (i + 1)}%)"></td>`
        }
        html += '</tr>'
    }
    
    palette.innerHTML = html;

    palette.style.width = width + 'px';
    palette.style.height = height + 'px';
}

buildPalette(4, 32, innerWidth - 250, 100);

const setColor = color => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
} 

palette.onclick = e => setColor(e.target.style.background);

