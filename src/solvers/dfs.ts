import Cell from "../cell";
import { constructWalkablePath, isWalkable } from "../utils";


export const dfs = (grid: Cell[][], start: Cell, end: Cell) => {
    let stack: Cell[] = []
    let cameFrom: Map<Cell, Cell> = new Map()

    stack.push(start)

    while (stack.length > 0) {
        let current = stack.pop()!
        if (current) {
            current.isWalked = true
            if (current.row === end.row && current.col === end.col) {
                console.log("reached")
                break
            }
            let neighbors = current.getNeighbors(grid, grid.length, grid[0].length)
            for (const neighbor of neighbors) {
                if (!neighbor.isWalked && isWalkable(current, neighbor)) {
                    stack.push(neighbor)
                    neighbor.isWalked = true
                    cameFrom.set(neighbor, current)
                }
            }
        }
        else {
            break
        }
    }

    return constructWalkablePath(cameFrom,start,end)
}