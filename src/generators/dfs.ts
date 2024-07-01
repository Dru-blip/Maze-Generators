
import Cell from "../cell";
import { removeWalls } from "../utils";


export const dfs = (grid: Cell[][], rows: number, cols: number) => {
    let current = grid[0][0]
    let stack: Cell[] = []

    // no of unvisited cells
    let remaining=(rows*cols)
    
    current.visited=true
    remaining--

    let path:Cell[]=[]
    path.push(current)

    while (remaining>0) {
        let neighbor = current.getRandomNeighbor(grid, rows, cols)
        
        if (neighbor) {
            neighbor.visited = true
            remaining--
            removeWalls(current, neighbor)
            stack.push(current)
            path.push(neighbor)
            current = neighbor
        } else if (stack.length > 0) {
            current = stack.pop()!
        }
    }
    return path
}




