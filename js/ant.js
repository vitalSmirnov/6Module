const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("btn-start")
const clearBtn = document.getElementById("btn-clear")

var alfa = 1
var beta = 2
var e = 0.1
var vertHeap = []
var ants = []


function distance(from, to) {
    return Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
}

function createMatrix(){
    let matrix = new Array()
    for (let i = 0; i < vertHeap.length; i++ ){
        matrix[i] = new Array()
    }

    for (let i = 0; i < vertHeap.length; i ++) {
        for (let j = 0; j < vertHeap.length; j++) {
            matrix[i][j] = distance(vertHeap[i], vertHeap[j])
        }
    }
    
    return matrix
}

function createsPheromones(){
    let ph = new Array()
    for (let i = 0; i < vertHeap.length; i++ ){
        ph[i] = new Array()
    }

    for (let i = 0; i < vertHeap.length; i++) {
        for (let j = 0; j < vertHeap.length; j++) {
            if (i == j) {
                ph[i][j] = 0
            }else{
                ph[i][j] = 1
            }
        }
    }
    return ph
}

function createNjMatix(matrix){
    let nj = new Array()
    for (let i = 0; i < vertHeap.length; i++ ){
        nj[i] = new Array()
    }
    
    for (let i = 0; i < vertHeap.length; i ++) {
        for (let j = 0; j < vertHeap.length; j++) {
            if (matrix[i][j] != 0) {
                nj[i][j] = 1 / matrix[i][j]
            }else{
                nj[i][j] = 0
            }
        }
    }
    
    return nj
}

function clearArea(){
    vertHeap = []
    ctx.beginPath();
    ctx.rect(0,0,1000,700)
    ctx.fillStyle = "white"
    ctx.fill();
}

function choice(a, matrix, njMatrix,pher) {

}

function algorithm(matrix, njMatrix, pher){
    for (let time = 0; time < 10000; time ++) {
        for (let a of ants) {
            for () {

            }
            choice(a,matrix,njMatrix,pher)
        }
    }
}


function start(){
    let matrix = createMatrix()
    let njMatrix = createNjMatix(matrix)
    let pheromones = createsPheromones()
    
    for (let i = 0; i < vertHeap.length; i ++) {
        let ant = {
            currentVert : i,
            visited: [i]
        }
        ants.push(ant)
    }

    algorithm(matrix, njMatrix, pheromones)
}



//events
startBtn.addEventListener("click", start)

clearBtn.addEventListener("click", clearArea)

canvas.addEventListener("mousedown", function(e){
    let mouse = {
        x:0,
        y:0,
    }
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.x
    mouse.y = e.clientY - ClientRect.y
    vertHeap.push(mouse)
    console.log(vertHeap)
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI*2)
    ctx.fillStyle = "#f3a734"
    ctx.fill();
});