import Cell from "../cell";
import { anyUnvisitedCells, getRandomNumber, removeWall, removeWalls } from "../utils";


export const randomWalk=(grid:Cell[][],rows:number,cols:number)=>{
    let path:Cell[]=[]

    let current=grid[0][0]
    let remaining=rows*cols

    current.visited=true
    remaining--
    path.push(current)

    while(remaining>0){
        let neighbors=current.getNeighbors(grid,rows,cols)
        let index=getRandomNumber(neighbors.length)
        let neighbor=neighbors[index]

        if(neighbor){
            if(!neighbor.visited){
                remaining--
                neighbor.visited=true
                path.push(neighbor)
                removeWalls(current,neighbor)
            }
            current=neighbor
        }
    }

    return path
}