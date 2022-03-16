var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function heuristic(a, b){
    return abs(a.x - b.x) + abs(a.y - b.y)
}
   
start = {}
goal = {}
let frontier = new Queue()
frontier.unshift(start, 0)
came_from = {}
came_from[start] = None

while (!empty(frontier)){
    current = frontier.shift()

    if (current === goal){
        break
    }
        
    
    for(next in graph.neighbors(current)){
        if ( came_from.includes(next) ){
            priority = heuristic(goal, next)
            frontier.unshift(next, priority)
            came_from[next] = current
        }  
    }
}
   