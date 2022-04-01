const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("btn-start")
const clearBtn = document.getElementById("btn-clear")

var dotHeap = []






function clearArea(){
    dotHeap = []
    ctx.beginPath();
    ctx.rect(0,0,1000,700)
    ctx.fillStyle = "white"
    ctx.fill();
}


function start(){
    
}



//events
startBtn.addEventListener("click", start)
clearBtn.addEventListener("click", clearArea)