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
            activeCell.classList.add('start')
            startCell = activeCell
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

function start(){
    if (startCell == null || finishCell == null){
        alert("Choose the route")
    }
    else{
        finishCell.x = parseInt((finishCell.id.split("_"))[0])
        finishCell.y = parseInt((finishCell.id.split("_"))[1])
        startCell.x = parseInt((startCell.id.split("_"))[0])
        startCell.y = parseInt((startCell.id.split("_"))[1])
        if (astar() == "failure"){
            alert("Пути нет")
        }else{
            rePath()
        }
    }
}

function wallsChange(){
    if (startCell == null || finishCell == null){
        alert("Choose the route")
    }else{
        let list = document.querySelectorAll("td")
        
        for (lst of list){
            if (lst.id != startCell.id && lst.id != finishCell.id && lst.classList.contains("wall")) {
                lst.classList.remove("wall")
            }
        } 
        let x
        let y
        for (let i = 0; i < (n * n / 4); i++){
            x = getRandomFrom()
            y = getRandomFrom()
            elem = document.getElementById(`${x}_${y}`)
            if (!elem.classList.contains("start" || "finish")){
                setField(x , y)
            }
        }
    }
}

//events

dim.addEventListener("change", dimensionChange);

startBtn.addEventListener("click", start);
wallsBtn.addEventListener("click", wallsChange);

//mazeGen


function getRandomFrom () {
	return Math.floor(Math.random() * (n));
}

function setField (x, y) {
	if (x < 0 || x >= n || y < 0 || y >= n) {
		return null;
	};
    (document.getElementById(`${x}_${y}`)).classList.add("wall")
}

//algorithm

function isWall(a, b){
    const result = document.getElementById(`${a}_${b}`).classList.contains('wall')
    console.log(result)
    return result
}

function heuristic(a, b){
    return (Math.abs(finishCell.x - a) + Math.abs(finishCell.y - b))
}

function isOpen(a, b, cash, openArr){
    for (let sou of openArr){
        if (sou.x == a && sou.y == b){
            if ((cash.w + cash.e) <= (sou.w + sou.e)){
                openArr.pop(sou)
                return true
            }
            return false
        }
        console.log(sou.x, sou.y)
    }
    return true
}

function isCLosed(a, b, closeArr){
    for (let used of closeArr){
        if (used.x == a && used.y == b){
            return false
        }
        console.log(used.x, used.y)
    }
    return true
}


function astar(){
    var closeArr = []
    var openArr = []
    let current = {
        x: startCell.x, 
        y: startCell.y,
        ax: null,
        ay: null,
        w: 0,
        e: 0,
        f: 0
    }

    openArr.push(current)

    while (openArr.length != 0){
        if (current.x == finishCell.x && current.y == finishCell.y) {
            return "good"
        }


        if(current.x > 0 && isWall(current.x - 1, current.y) && isCLosed(current.x - 1, current.y, closeArr)){
            let cash = {
                x: current.x - 1, 
                y: current.y,
                ax: current.x, 
                ay: current.y,
                w: 10,
                e: heuristic(current.x-1, current.y),
                f: 10 + e
            }
            if (isOpen(current.x - 1, current.y,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.x < n - 1 && isWall(current.x + 1, current.y) && isCLosed(current.x + 1, current.y, closeArr)){
            let cash = {
                x: current.x + 1, 
                y: current.y,
                ax: current.x, 
                ay: current.y,
                w: 10,
                e: heuristic(current.x + 1, current.y),
                f: 10 + e
            }
            if (isOpen(current.x + 1, current.y,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y > 0 && isWall(current.x, current.y - 1) && isCLosed(current.x, current.y - 1, closeArr)){
            let cash = {
                x: current.x, 
                y: current.y - 1,
                ax: current.x, 
                ay: current.y,
                w: 10,
                e: heuristic(current.x, current.y - 1),
                f: 10 + e
            }
            if (isOpen(current.x, current.y - 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y < n - 1 && isWall(current.x, current.y + 1) && isCLosed(current.x, current.y + 1, closeArr)){
            let cash = {
                x: current.x, 
                y: current.y + 1,
                ax: current.x, 
                ay: current.y,
                w: 10,
                e: heuristic(current.x, current.y + 1),
                f: 10 + e
            }
            if (isOpen(current.x, current.y + 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y > 0 && current.x > 0 && isWall(current.x - 1, current.y - 1) && isCLosed(current.x - 1, current.y - 1, closeArr)){
            let cash = {
                x: current.x - 1, 
                y: current.y - 1,
                ax: current.x, 
                ay: current.y,
                w: 14,
                e: heuristic(current.x - 1, current.y - 1),
                f: 14 + e
            }
            if (isOpen(current.x - 1, current.y - 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y < n-1 && current.x < n - 1 && isWall(current.x + 1, current.y + 1) && isCLosed(current.x + 1, current.y + 1, closeArr)){
            let cash = {
                x: current.x + 1, 
                y: current.y + 1,
                ax: current.x, 
                ay: current.y,
                w: 14,
                e: heuristic(current.x + 1, current.y + 1),
                f: 14 + e
            }
            if (isOpen(current.x + 1, current.y + 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y > 0 && current.x <  n - 1 && isWall(current.x- 1, current.y + 1) && isCLosed(current.x - 1, current.y + 1, closeArr)){
            let cash = {
                x: current.x - 1, 
                y: current.y + 1,
                ax: current.x, 
                ay: current.y,
                w: 14,
                e: heuristic(current.x - 1, current.y + 1),
                f: 14 + e
            }
            if (isOpen(current.x - 1, current.y + 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        if(current.y < n - 1 && current.x > 0 && isWall(current.x + 1, current.y - 1) && isCLosed(current.x + 1, current.y - 1, closeArr)){
            let cash = {
                x: current.x + 1, 
                y: current.y - 1,
                ax: current.x, 
                ay: current.y,
                w: 14,
                e: heuristic(current.x + 1, current.y - 1),
                f: 14 + e
            }
            if (isOpen(current.x + 1, current.y - 1,cash,openArr)) {
                openArr.push(cash)
            }
        }
        closeArr.push(current)
        openArr.pop(current)
        let minWeight = 99999
        for(let min of openArr){
            if (minWeight >= min.f){
                minWeight = min.f
                current = min
            }
        }
    }
    return "failure"
}

function rePath(a, b){
    while (a != startCell.x || b !=startCell.y){
        for (let elem of closeArr) {
            if (elem.x == a && elem.y == b) {
                rePath(elem.ax, elem.ay)
            }
        }
    }
    (document.getElementById(`${a}_${b}`)).classList.add("path")
    return null
}