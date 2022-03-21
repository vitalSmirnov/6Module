var table = document.createElement('table');
var tbody = document.createElement('tbody');
table.appendChild(tbody)
document.getElementById("table").appendChild(table)
var dim = document.getElementById("poleDim")
var startBtn = document.getElementById("btn_start")
var wallsBtn = document.getElementById("btn-walls")
var startCell = document.querySelector('.start')
var finishCell = document.querySelector('.finish')


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
}



function dimensionChange(){
    table.removeChild(tbody)
    tbody = document.createElement('tbody');
    table.appendChild(tbody)
    let n = document.getElementById("poleDim").value;
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
    }else{
        alert(startCell.id.split('_'))
        alert(finishCell.id.split('_'))
    }
}

//events

dim.addEventListener("change", dimensionChange);

startBtn.addEventListener("click", start);


//algorithm