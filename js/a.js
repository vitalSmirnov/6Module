let table = document.createElement('table');
let tbody = document.createElement('tbody');

table.appendChild(tbody)
document.getElementById("table").appendChild(table)

//algorithm

document.querySelector(".btn").onclick = function(){
    table.removeChild(tbody)
    tbody = document.createElement('tbody');
    table.appendChild(tbody)
    var n = document.getElementById("poleDim").value;
    for(i = 0; i < n; i += 1){
        let row = document.createElement('tr');
        for(j = 0; j < n; j++){
            row.appendChild(document.createElement('td'))
        }
        tbody.appendChild(row)
    }
}