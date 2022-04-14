const canvas = document.getElementById("myCanvas");
const startBtn = document.getElementById("btn-start")
const slider = document.getElementById("myRange")
const btnRefresh = document.getElementById("btn-clear")
const ctx = canvas.getContext("2d");

var dotHeap = []
var colorsOfCanvas = []
var clasterCenters = []
var betaClasterCenters = []
var countClasters = 0



function valueChanger(){
    let val = document.getElementById("slValue")
    val.innerHTML = slider.value
    countClasters = slider.value
}


function getRndInt(max) {
    return Math.floor(Math.random() * max);
}

function generateColor() {
    let color = '#' + Math.floor(Math.random()*16777215).toString(16)
    colorsOfCanvas.push(color)
    return color
}


  

//events
btnRefresh.addEventListener("click", refreshing)

slider.addEventListener("change", valueChanger)

canvas.addEventListener("mousedown", function(e){
    let mouse = {
        x:0,
        y:0,
        color: "#000"
    }
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.x
    mouse.y = e.clientY - ClientRect.y
    dotHeap.push(mouse)
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI*2)
    ctx.fillStyle = mouse.color
    ctx.fill();
});

startBtn.addEventListener("click", startClaster)

//algorithm

function clearClasters(){
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
        clearClasters()
        for (let i = 0; i <  countClasters; i++) {
            let center = {
                x: getRndInt(600),
                y: getRndInt(600),
                color : generateColor()
            }
            while (notDot(center)) {
                center.x = getRndInt(600)
                center.y = getRndInt(600)
                center.color = generateColor()
            }
            ctx.beginPath();
            ctx.rect(center.x, center.y, 8, 8)
            ctx.fillStyle = center.color
            ctx.fill();
            clasterCenters.push(center)
        } 
    }
}

function changeCenters() {
    betaClasterCenters = []
    for (let cntr of clasterCenters) {
        let betaCntr = {
            x: cntr.x,
            y: cntr.y,
            color: cntr.color
        }
        betaClasterCenters.push(betaCntr)
        let averageX = 0
        let averageY = 0
        let cc = 0
        let checkOut = false
        for (let dot of dotHeap) {
            if (dot.color == cntr.color) {
                averageX += dot.x
                averageY += dot.y
                cc += 1
                checkOut = true
            }
        }
        if (checkOut) {
            ctx.beginPath();
            ctx.rect(cntr.x, cntr.y, 10, 10)
            ctx.fillStyle = "white"
            ctx.fill();
            cntr.x = averageX / cc
            cntr.y = averageY / cc
            ctx.beginPath();
            ctx.rect(cntr.x, cntr.y, 8, 8)
            ctx.fillStyle = cntr.color
            ctx.fill();
        }

    }
}

function setColored(dot) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 10, 0, Math.PI*2)
    ctx.fillStyle = dot.color
    ctx.fill();
}

function isupdate(clasterCenters, betaClasterCenters){
    let k = 0
    for (cc in clasterCenters) {
        if (Math.abs(betaClasterCenters[cc].x - clasterCenters[cc].x) < 5 || Math.abs(betaClasterCenters[cc].y - clasterCenters[cc].y) < 5) {
            k ++
        }
    }
    if (k >= countClasters) {
        return false
    }else{
        return true
    }
}
function updateGroups(){
    
    for (let dot of dotHeap) {
        let min = 999999
        let claster
        for (let cc of clasterCenters) {
            let d = Math.pow(cc.x - dot.x, 2) + Math.pow(cc.y - dot.y, 2)
            if (d < min) {
                min = d
                claster = cc
            }
        }
        dot.color = claster.color
        setColored(dot)
    }
}
function timedStart(){
    changeCenters()
    updateGroups()
}

function startClaster(){
    setCenters()
    updateGroups()
    var timer = setTimeout(function run() {
        timedStart()
        timer = setTimeout(run, 500);
        if (!isupdate(clasterCenters, betaClasterCenters)){
            console.log("stopping")
            clearInterval(timer)
        }
      }, 500);
}

function refreshing(){
    dotHeap = []
    clasterCenters = []
    colorsOfCanvas = []
    clearInterval(timer)
    ctx.beginPath();
    ctx.rect(0,0,600,600)
    ctx.fillStyle = "white"
    ctx.fill();
}
