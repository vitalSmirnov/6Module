var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let draw = false
let slider = document.getElementById("myRange")
let btnRefresh = document.getElementById("btn-clear")

let mouse = {
    x:0,
    y:0
}

function valueChanger(){
    console.log(slider)
    let val = document.getElementById("slValue")
    val.innerHTML = slider.value
}

canvas.addEventListener("mousedown", function(e){
 
    let ClientRect = this.getBoundingClientRect();
    console.log(ClientRect, e.clientX, e.clientY)
    mouse.x = e.clientX - ClientRect.x
    mouse.y = e.clientY - ClientRect.y
    console.log(mouse.x, mouse.y)
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "#000"
    ctx.fill();
});

function refreshing(){
    ctx.beginPath();
    ctx.rect(0,0,600,600)
    ctx.fillStyle = "white"
    ctx.fill();
}

btnRefresh.addEventListener("click", refreshing)
slider.addEventListener("change", valueChanger)