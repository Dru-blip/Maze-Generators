import Cell from "../cell"
import { ICompare } from '@datastructures-js/priority-queue';

export const gcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
    return a.gcost < b.gcost ? -1 : 1
}

export const hcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
    return a.hcost < b.hcost ? -1 : 1
}

export const fcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
    return a.fcost < b.fcost ? -1 : 1
}

export const manhattanDistance = (a: Cell, b: Cell) => {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}




export const getRandomNumber=(max:number)=>{
    return Math.floor(Math.random() * max)
}

export const constructWalkablePath = (cameFrom: Map<Cell, Cell>, start: Cell, end: Cell) => {
    let path = []
    let current = end
    while (current.row !== start.row || current.col !== start.col) {
        path.push(current)
        let next = cameFrom.get(current)!
        current.walkableDirection = getWalkableDirection(current, next)!
        current = next
    }
    path.push(start)
    path.reverse()
    return path
}

export const getWalkableDirection = (a: Cell, b: Cell) => {
    let rowDiff = a.row - b.row
    let colDiff = a.col - b.col

    if (rowDiff === 1) {
        return "bottom"
    } else if (rowDiff === -1) {
        return "top"
    }

    if (colDiff === 1) {
        return "right"
    } else if (colDiff === -1) {
        return "left"
    }
}


export const isWalkable = (a: Cell, b: Cell) => {
    let rowDiff = a.row - b.row
    let colDiff = a.col - b.col

    if (rowDiff === 1) {
        return a.walls['top'] === false && b.walls['bottom'] === false
    } else if (rowDiff === -1) {
        return a.walls['bottom'] === false && b.walls['top'] === false
    }

    if (colDiff === 1) {
        return a.walls['left'] === false && b.walls['right'] === false
    } else if (colDiff === -1) {
        return a.walls['right'] === false && b.walls['left'] === false
    }
}

export const checkBounds=(rows:number,cols:number,row:number,col:number)=>{
    return (row>=0 && row<rows) && (col>=0 && col<cols)
}

export const removeWall = (a: Cell,b:Cell, direction: string) => {
    if (direction === 'left') {
        a.walls["left"] = false
        b.walls['right'] = false
    } 
    
    if(direction==="right") {
        a.walls["right"] = false
        b.walls['left'] = false
    }

    if (direction === "top") {
        a.walls["top"] = false
        b.walls['bottom'] = false
    } 
    
    if(direction==="bottom"){
        a.walls["bottom"] = false
        b.walls['top'] = false
    }
}

export const removeWalls = (a: Cell, b: Cell) => {
    let rowDiff = a.row - b.row
    let colDiff = a.col - b.col

    if (rowDiff === 1) {
        a.walls['top'] = false
        b.walls['bottom'] = false
    } else if (rowDiff === -1) {
        a.walls['bottom'] = false
        b.walls['top'] = false
    }

    if (colDiff === 1) {
        a.walls['left'] = false
        b.walls['right'] = false
    } else if (colDiff === -1) {
        a.walls['right'] = false
        b.walls['left'] = false
    }
}

export const getRandomCell=(grid:Cell[][])=>{
    let row=getRandomNumber(grid.length)
    let col=getRandomNumber(grid[0].length)
    return grid[row][col]
}


// return true if any one of the cells are not visited else false
export const anyUnvisitedCells = (grid: Cell[][]) => {
    for (const cells of grid) {
        for (const cell of cells) {
            if (!cell.visited) return true
        }
    }
    return false
}

export const getFirstUnvisitedCell = (grid: Cell[][]) => {
    for (const cells of grid) {
        for (const cell of cells) {
            if (!cell.visited) return cell
        }
    }
}



//disjoint set 
export const find=(a:Cell)=>{
    let root=a
    while(root.parent!==root){
        root=root.parent
    }
    return root
}

export const union=(a:Cell,b:Cell)=>{
    let set1=find(a)
    let set2=find(b)

    if(set1!==set2){
        set2.parent=set1
    }
}