const table = document.createElement('table');
var tbody = document.createElement('tbody');
table.appendChild(tbody)
document.getElementById("table").appendChild(table)
var dim = document.getElementById("poleDim")
const startBtn = document.getElementById("btn_start")
const wallsBtn = document.getElementById("btn_walls")
var startCell = document.querySelector('.start')
var finishCell = document.querySelector('.finish')
var n = document.getElementById("poleDim").value;





//visual funcs

function sizeTable(row, td, n){
    let sizeBlock = 700 / n;
    td.style.width = sizeBlock + "px"
    if (sizeBlock > 5){
        td.style.padding = '5px 5px'
    }else{
        td.style.padding = `${sizeBlock}px ${sizeBlock}px`
    }
    
    row.style.height = sizeBlock + "px"

}

function cellHandler(event){
    let activeCell = document.getElementById(event.path[0].id)
    if (!activeCell.classList.contains("wall")){
        if (startCell === null && finishCell === null) {
            activeCell.classList.add('start')
            startCell = activeCell
        } else if (finishCell === null && startCell != null) {
            activeCell.classList.add('finish')
            finishCell = activeCell
        }else{
            startCell.classList.remove('start')
            finishCell.classList.remove('finish')
            finishCell = null
            startCell = null
        }
    } else{
        alert("Дурак, что-ли это Стена")
    }
}

function dimensionChange(){
    table.removeChild(tbody)
    tbody = document.createElement('tbody');
    table.appendChild(tbody)
    n = document.getElementById("poleDim").value;
    if (n % 2 != 1){
        alert("выберите нечетное число для лучшей работы")
    }
    else{
        for(i = 0; i < n; i += 1){
            let row = document.createElement('tr');
            for(j = 0; j < n; j++){
                let td = document.createElement('td')
                td.id = `${i}_${j}`
                td.addEventListener("click", cellHandler)
                row.appendChild(td)
                sizeTable(row, td, n)
            }
            tbody.appendChild(row)
        }
    }
    
}

function start(){
    if (startCell == null || finishCell == null){
        alert("Choose the route")
    }
    else{
        finishCell.x = parseInt((finishCell.id.split("_"))[0])
        finishCell.y = parseInt((finishCell.id.split("_"))[1])
        startCell.x = parseInt((startCell.id.split("_"))[0])
        startCell.y = parseInt((startCell.id.split("_"))[1])
        if (astar() == null){
            alert("Пути нет")
        }
    }
}

function wallsChange(){
    if (startCell != null){
        alert("Remove Start / Finish")
    }else{
        var openSpace = []
        
        let list = document.querySelectorAll("td")
        
        for (lst of list){
            lst.classList.add("wall")
        }
        for (ix = 1; ix < n; ix += 2) {
            for (iy = 1; iy < n; iy += 2) {
                setSpace(`${ix}_${iy}`)
                let objMazeOpen = {
                    id: '0_0',
                    visited: false,
                    neighbours : []
                }
                objMazeOpen.id = `${ix}_${iy}`
                if (ix > 1 && ix < n - 2){
                    objMazeOpen.neighbours.push(`${ix-2}_${iy}`, `${ix+2}_${iy}`)
                } else if (ix == 1) {
                    objMazeOpen.neighbours.push(`${ix+2}_${iy}`)
                } else{
                    objMazeOpen.neighbours.push(`${ix-2}_${iy}`)
                }

                if (iy > 1 && iy < n - 2){
                    objMazeOpen.neighbours.push(`${ix}_${iy - 2}`, `${ix}_${iy + 2}`)
                } else if (iy == 1) {
                    objMazeOpen.neighbours.push(`${ix}_${iy + 2}`)
                } else{
                    objMazeOpen.neighbours.push(`${ix}_${iy - 2}`)
                }
                openSpace.push(objMazeOpen)
            }
        }
        mazeGeneration(openSpace)
    }
}

//events

dim.addEventListener("change", dimensionChange);

startBtn.addEventListener("click", start);
wallsBtn.addEventListener("click", wallsChange);

//mazeGen

function setSpace(id){
    (document.getElementById(id)).classList.remove("wall")
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function isNotVisited(openSpace) {
    for (vis of openSpace) {
        if (vis.visited == false) {
            return true
        }
    }
    return false
}
function isNeibhourVisited(curN, openSpace){
    let ngbrs = []
    for (ns of curN){
        for (o of openSpace) {
            if (o.id == ns && !o.visited) {
                ngbrs.push(ns)
            }
        }
    }
    return ngbrs
}

function mazeGeneration(openSpace){

    let stack = []
    let rand
    let close
    let current = openSpace[0]
    current.visited = true
    while (isNotVisited(openSpace)) {
        current.neighbours = isNeibhourVisited(current.neighbours, openSpace)
        if (current.neighbours.length != 0) {
            stack.push(current)
            rand = getRandomInt(current.neighbours.length)
            close = current.neighbours[rand]
            if (close.split("_")[0] == (current.id).split("_")[0]){  /* одна строка*/
                    if (parseInt(close.split("_")[1]) > parseInt(current.id.split("_")[1])) {
                        let x = parseInt(close.split("_")[0])
                        let y = parseInt(close.split("_")[1]) - 1
                        setSpace(`${x}_${y}`)
                    }else {
                        let x = parseInt(close.split("_")[0])
                        let y = parseInt(close.split("_")[1]) + 1
                        setSpace(`${x}_${y}`)
                    }
            }else if (close.split("_")[1] == (current.id).split("_")[1]){ /* одна колонка*/
                    if (parseInt(close.split("_")[0]) > parseInt(current.id.split("_")[0])) {
                        let x = parseInt(close.split("_")[0]) - 1
                        let y = parseInt(close.split("_")[1]) 
                        setSpace(`${x}_${y}`)
                    }else {
                        let x = parseInt(close.split("_")[0]) + 1
                        let y = parseInt(close.split("_")[1])
                        setSpace(`${x}_${y}`)
                    }
            }
            else {
                console.log("TROUBLES")
            }
                for (op of openSpace) {
                    if (op.id == close){
                        current = op
                        current.visited = true
                    }
                }
        } 
        else if (stack.length != 0) {
            current = stack.pop()
        } 
        else {
            console.log("что-то не так")
            current = openSpace[getRandomInt(openSpace.length)]
            while (!current.visited){
                current = openSpace[getRandomInt(openSpace.length)]
            }
        }
    }
}

//algorithm
function minimum(openHeap, closeHeap){
    let min = 999999999
    let minElem
    for (let op of openHeap) {
        if (min >= op.f && isClosed(op.x, op.y, closeHeap)){
            min = op.f
            minElem = op
        }
    }
    return minElem
}


function isWall(a, b) {
    const result = (document.getElementById(`${a}_${b}`)).classList.contains('wall')
    return result
}

function isClosed(x, y, closeHeap) {
    for ( let cl in closeHeap) {
        if (x == closeHeap[cl].x && y == closeHeap[cl].y){
            return false
        }
    }
    return true
}

function isOpened(x, y, openHeap) {
    for (let op of openHeap) {
        if (x == op.x && y == op.y){
            return true
        }
    }
    return false
}

function isOpenedId(x, y, openHeap){
    for (let op in openHeap) {
        if (x == openHeap[op].x && y == openHeap[op].y){
            return op
        }
    }
}

function heuristic(a, b) {
    return (Math.abs(finishCell.x - a) + Math.abs(finishCell.y - b))
}

function setCheck(id){
    let elem = document.getElementById(id)
    elem.classList.add("check")
}

function setPath(id){
    let elem = document.getElementById(id)
    elem.classList.remove("visited")
    elem.classList.remove("check")
    elem.classList.add("path")
}

function setVisited(id){
    let elem = document.getElementById(id)
    elem.classList.remove("check")
    elem.classList.add("visited")
}

function rePath(x, y, closeHeap){
    if (x == startCell.x && y == startCell.y) {
        return true
    }else{
        for (cl of closeHeap) {
            if (cl.x == x && cl.y == y) {
                setPath(`${x}_${y}`)
                return rePath(cl.ax, cl.ay, closeHeap)
            }
        }
    }
}

function astar() {
    let openHeap = []
    var closeHeap = []
    let curr = {
        x: startCell.x,
        y: startCell.y,
        ax: null,
        ay: null,
        g: 0,
        h: heuristic(startCell.x, startCell.y),
        f: heuristic(startCell.x, startCell.y)
    }
    openHeap.push(curr)
    while (curr.x != finishCell.x || curr.y != finishCell.y) {
        if (curr.x < n - 1 && !isWall(curr.x + 1, curr.y) && isClosed(curr.x+1,curr.y,closeHeap)){
            setCheck(`${curr.x + 1}_${curr.y}`)
            let cash = {
                x: curr.x + 1,
                y: curr.y,
                ax: curr.x,
                ay: curr.y,
                g: 10,
                h: heuristic(curr.x + 1, curr.y),
                f: 10 + heuristic(curr.x + 1, curr.y)
            }
            if (isOpened(curr.x+1,curr.y, openHeap)){
                let id = isOpenedId(curr.x+1,curr.y, openHeap)
                if (openHeap[id].f > cash.f){
                    openHeap[id] = cash
                }
            }else{
                openHeap.push(cash)
            }
        }

        if (curr.x > 0 &&!isWall(curr.x - 1, curr.y) && isClosed(curr.x-1,curr.y,closeHeap)){
            setCheck(`${curr.x - 1}_${curr.y}`)
            let cash = {
                x: curr.x - 1,
                y: curr.y,
                ax: curr.x,
                ay: curr.y,
                g: 10,
                h: heuristic(curr.x - 1, curr.y),
                f: 10 + heuristic(curr.x - 1, curr.y)
            }
            if (isOpened(curr.x-1,curr.y, openHeap)){
                let id = isOpenedId(curr.x-1,curr.y, openHeap)
                if (openHeap[id].f > cash.f){
                    openHeap[id] = cash
                }
            }else{
                openHeap.push(cash)
            }
        }

        if (curr.y < n - 1 &&!isWall(curr.x, curr.y + 1) && isClosed(curr.x,curr.y + 1,closeHeap)){
            setCheck(`${curr.x}_${curr.y + 1}`)
            let cash = {
                x: curr.x,
                y: curr.y + 1,
                ax: curr.x,
                ay: curr.y,
                g: 10,
                h: heuristic(curr.x, curr.y + 1),
                f: 10 + heuristic(curr.x, curr.y + 1)
            }
            if (isOpened(curr.x,curr.y + 1, openHeap)){
                let id = isOpenedId(curr.x,curr.y + 1, openHeap)
                if (openHeap[id].f > cash.f){
                    openHeap[id] = cash
                }
            }else{
                openHeap.push(cash)
            }
        }

        if (curr.y > 0 && !isWall(curr.x, curr.y - 1) && isClosed(curr.x,curr.y - 1,closeHeap)){
            setCheck(`${curr.x}_${curr.y - 1}`)
            let cash = {
                x: curr.x,
                y: curr.y - 1,
                ax: curr.x,
                ay: curr.y,
                g: 10,
                h: heuristic(curr.x, curr.y - 1),
                f: 10 + heuristic(curr.x, curr.y - 1)
            }
            if (isOpened(curr.x,curr.y - 1, openHeap)){
                let id = isOpenedId(curr.x,curr.y - 1, openHeap)
                if (openHeap[id].f > cash.f){
                    openHeap[id] = cash
                }
            }else{
                openHeap.push(cash)
            }
        }
        closeHeap.push(curr)
        setVisited(`${curr.x}_${curr.y}`)
        curr = minimum(openHeap, closeHeap)
        if (curr.x == finishCell.x && curr.y == finishCell.y) {
            closeHeap.push(curr)
        }
    }
    rePath(finishCell.x, finishCell.y, closeHeap)
    return "good"
}

