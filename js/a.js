const table = document.createElement('table');
var tbody = document.createElement('tbody');
table.appendChild(tbody)
document.getElementById("table").appendChild(table)
var dim = document.getElementById("poleDim")
var startBtn = document.getElementById("btn_start")
var wallsBtn = document.getElementById("btn_walls")
var startCell = document.querySelector('.start')
var finishCell = document.querySelector('.finish')
var n = document.getElementById("poleDim").value;
var cleaner = {}
cleaner.x
cleaner.y




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
}

function wallsChange(){
    if (startCell == null || finishCell == null){
        alert("Choose the route")
    }else{
        /*let list = document.querySelectorAll("td")
         for (lst of list){
            if (lst.id != startCell.id && lst.id != finishCell.id && !lst.classList.contains("wall")) {
                lst.classList.add("wall")
            }
        } 
        cleaner.x = (startCell.id.split("_"))[0]
        cleaner.y = (startCell.id.split("_"))[1]*/
        let x
        let y
        for (let i = 0; i < (n * n / 3); i++){
            x = getRandomFrom()
            y = getRandomFrom()
            if (!document.getElementById(`${x}_${y}`).classList.contains("start" || "finish" || "wall")){
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