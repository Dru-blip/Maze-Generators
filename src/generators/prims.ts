import Cell from "../cell";
import { getRandomCell, getRandomNumber, removeWalls } from "../utils";



const addFrontiers = (grid: Cell[][], frontiers: Cell[], current: Cell) => {
    let neighbors = current.getNeighbors(grid, grid.length, grid[0].length)
    neighbors.forEach((neighbor) => {
        if (!neighbor.visited && !frontiers.includes(neighbor)) {
            frontiers.push(neighbor)
        }
    })
}

const getRandomFrontier = (frontiers: Cell[]): Cell => {
    let index = getRandomNumber(frontiers.length)
    return frontiers.splice(index, 1)[0]
}


export const prims = (grid: Cell[][], rows: number, cols: number): Cell[] => {

    let frontiers: Cell[] = []
    let path: Cell[] = []
    let startCell = getRandomCell(grid)
    
    startCell.visited = true
    path.push(startCell)
    addFrontiers(grid, frontiers, startCell)

    while (frontiers.length > 0) {
        let frontier = getRandomFrontier(frontiers)
        frontier.visited = true
        path.push(frontier)
        let neighbor = frontier.getRandomVisitedNeighbor(grid, rows, cols)
        if (neighbor) {
            removeWalls(neighbor, frontier)
        }
        addFrontiers(grid, frontiers, frontier)
    }

    return path
}