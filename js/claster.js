const canvas = document.getElementById("myCanvas");
const startBtn = document.getElementById("btn-start")
const slider = document.getElementById("myRange")
const btnRefresh = document.getElementById("btn-clear")
const ctx = canvas.getContext("2d");

var dotHeap = []
var clasterCenters = []
var countClasters = 0



function valueChanger(){
    let val = document.getElementById("slValue")
    val.innerHTML = slider.value
    countClasters = slider.value
}



function refreshing(){
    dotHeap = []
    clasterCenters = []
    ctx.beginPath();
    ctx.rect(0,0,600,600)
    ctx.fillStyle = "white"
    ctx.fill();
}

function getRndInt(max) {
    return Math.floor(Math.random() * max);
}


//events
btnRefresh.addEventListener("click", refreshing)

slider.addEventListener("change", valueChanger)

canvas.addEventListener("mousedown", function(e){
    let mouse = {
        x:0,
        y:0
    }
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.x
    mouse.y = e.clientY - ClientRect.y
    dotHeap.push(mouse)
    console.log(dotHeap)
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "#000"
    ctx.fill();
});

startBtn.addEventListener("click", startClaster)

//algorithm

function refreshClasters(){
    for ( let cc of clasterCenters) {
        ctx.beginPath();
        ctx.arc(cc.x, cc.y, 11, 0, Math.PI*2)
        ctx.fillStyle = "white"
        ctx.fill();
    }
    clasterCenters = []
}

function notDot(center){
    for (let dt of dotHeap){
        if (Math.abs(dt.x - center.x) < 20 && Math.abs(dt.y - center.y) < 20){
            return true
        }
    }
    return false
}

function setCenters(){
    if (countClasters == 0) {
        alert("choose the group")
    }else{
        refreshClasters()
        for (let i = 0; i <  countClasters; i++) {
            let center = {
                x: getRndInt(600),
                y: getRndInt(600),
            }
            while (notDot(center)) {
                center.x = getRndInt(600)
                center.y = getRndInt(600)
            }
            ctx.beginPath();
            ctx.arc(center.x, center.y, 10, 0, Math.PI*2)
            ctx.fillStyle = "red"
            ctx.fill();
            clasterCenters.push(center)
        } 
    }
}

function startClaster(){
    setCenters()
}
