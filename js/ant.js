const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("btn-start")
const clearBtn = document.getElementById("btn-clear")

var alfa = 1
var beta = 2
var e = 0.1
var vertHeap = []
var ants = []
var GlobalPath = 999999999999999

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

function isvisited(city, visited){
    for (let vis of visited) {
        if ( vis == city) {
            return false
        }
    }
    return true
}

function getRndInt(max) {
    return Math.floor(Math.random());
}

function roulette(cash){

}

function moveAnts(ant, x, y){
    ctx.beginPath()
    ctx.arc(ant.x, ant.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "#3BB143"
    ctx.fill()

    ctx.beginPath()
    ctx.rect(ant.x, ant.y, 2, 4)
    ctx.fillStyle = "black"
    ctx.fill()

}

function P(a, njMatrix, pher, city) {
    let sumPher = 0
    for (let i = 0; i < pher.length; i ++) {
        sumPher = pher[a.currentVert][i] * njMatrix[a.currentVert][i]
    }
    return (Math.pow(pher[a.currentVert][city], alfa)* Math.pow(njMatrix[a.currentVert][city], beta)) / sumPher
}

function algorithm(matrix, njMatrix, pher){
    for (let time = 0; time < 10000; time ++) {
        for (let a of ants) {
            let maxCity
            let cash = []
            let checkout = false
            for (let city in vertHeap){
                if (isvisited(vertHeap[city], a.visited)){
                    cash.push(P(a, njMatrix, pher, city))
                    maxCity = roulette(cash)
                    checkout = true
                }
            }
            if (checkout) {
                a.visited.push(a.currentVert)
                a.path += matrix[a.currentVert][maxCity]
                a.currentVert = maxCity
            }

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
            path : 0,
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
        color: "#3BB143"
    }
    let ClientRect = this.getBoundingClientRect();
    mouse.x = e.clientX - ClientRect.x
    mouse.y = e.clientY - ClientRect.y
    vertHeap.push(mouse)
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI*2)
    ctx.fillStyle = mouse.color
    ctx.fill()
    ctx.strokeStyle = "#99EDC3"
    for (let vert of vertHeap) {
        ctx.moveTo(mouse.x, mouse.y)
        if (vert.x != mouse.x || vert.y != mouse.y) {
            ctx.lineTo(vert.x, vert.y)
            ctx.stroke()
        }
    }
});