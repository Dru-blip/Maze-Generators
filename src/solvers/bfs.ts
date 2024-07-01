import Cell from "../cell";
import { constructWalkablePath, isWalkable } from "../utils";


export const bfs = (grid: Cell[][], start: Cell, end: Cell) => {
    let queue: Cell[] = []
    let cameFrom: Map<Cell, Cell> = new Map()

    queue.push(start)

    while (queue.length > 0) {
        let current = queue.shift()!
        if (current) {
            current.isWalked = true
            if (current.row === end.row && current.col === end.col) {
                console.log("reached")
                break
            }
            let neighbors = current.getNeighbors(grid, grid.length, grid[0].length)
            for (const neighbor of neighbors) {
                if (!neighbor.isWalked && isWalkable(current, neighbor)) {
                    queue.push(neighbor)
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