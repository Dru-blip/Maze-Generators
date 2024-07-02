import Cell from "../cell";
import {  removeWalls } from "../utils";


const hunt=(grid:Cell[][],rows:number,cols:number,path:Cell[])=>{
    for(let row=0;row<rows;row++){
        for(let col=0;col<cols;col++){
            let cell=grid[row][col]
            if(!cell.visited){
                let neighbor=cell.getRandomVisitedNeighbor(grid,rows,cols)
                if(neighbor){
                    return [cell,neighbor]
                }
            }
            // path.push(cell)
        }
    }
    return undefined
}

export const huntAndKill=(grid:Cell[][],rows:number,cols:number)=>{
    let currentCell=grid[0][0]

    let remaining=rows*cols
    let path:Cell[]=[]
    currentCell.visited=true
    remaining--
    path.push(currentCell)

    while(remaining>0){
        let neighbor=currentCell.getRandomNeighbor(grid,rows,cols)
        if(neighbor){
            neighbor.visited=true
            remaining--
            path.push(neighbor)
            removeWalls(neighbor,currentCell)
            currentCell=neighbor
        }else{
            let cell
            [currentCell,cell]=hunt(grid,rows,cols,path)!
            if(cell){
                currentCell.visited=true
                remaining--
                path.push(currentCell)
                removeWalls(currentCell,cell)
                currentCell=cell                
            }
        }
    }

    return path
    
}