let model;

let clickX = [];
let clickY = [];
let clickD = [];
let drawing;

const canvasjq = $("#canvas");
let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvasjq.mousedown(function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    drawing = true;
    addUserGesture(mouseX, mouseY);
    drawOnCanvas();
});

canvas.addEventListener("touchstart", function (e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];

    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    drawing = true;
    addUserGesture(mouseX, mouseY);
    drawOnCanvas();

}, false);

canvasjq.mousemove(function (e) {
    if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        addUserGesture(mouseX, mouseY, true);
        drawOnCanvas();
    }
});

canvas.addEventListener("touchmove", function (e) {
    if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const mouseX = touch.clientX - rect.left;
        const mouseY = touch.clientY - rect.top;

        addUserGesture(mouseX, mouseY, true);
        drawOnCanvas();
    }
}, false);

canvasjq.mouseup(function (e) {
    drawing = false;
});

canvas.addEventListener("touchend", function (e) {
    drawing = false;
}, false);

canvasjq.mouseleave(function (e) {
    drawing = false;
});

canvas.addEventListener("touchleave", function (e) {
    drawing = false;
}, false);

function addUserGesture(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickD.push(dragging);
}

function drawOnCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;

    for (let i = 0; i < clickX.length; i++) {
        ctx.beginPath();
        if (clickD[i] && i) {
            ctx.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            ctx.moveTo(clickX[i] - 1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

async function load() {
    model = undefined;
    model = await tf.loadLayersModel("models/model.json");
}

load();//.then(r => {});

function preprocessCanvas(image) {
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();

    return tensor.div(255.0);
}

$("#predict-button").click(async function () {
    let tensor = preprocessCanvas(canvas);
    let predictions = await model.predict(tensor).data();
    let results = Array.from(predictions);

    let max = results[0];
    let maxIndex = 0;

    console.log(predictions);

    for (let i = 1; i < results.length; i++) {
        if (results[i] > max) {
            maxIndex = i;
            max = results[i];
        }
    }

    $("#result").text("PREDICTED DIGIT: " + maxIndex);
});

$("#clear-button").click(async function () {
    ctx.clearRect(0, 0, 600, 600);
    clickX = [];
    clickY = [];
    clickD = [];
    $("#result").text("// waiting for input");
});