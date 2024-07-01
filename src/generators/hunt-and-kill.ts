import Cell from "../cell";
import { getRandomCell, removeWalls } from "../utils";


const hunt=(grid:Cell[][],rows:number,cols:number,path:Cell[])=>{
    for(let row=0;row<rows;row++){
        for(let col=0;col<cols;col++){
            let cell=grid[row][col]
            if(!cell.visited){
                let neighbors=cell.getNeighbors(grid,rows,cols).filter((c)=>c.visited)
                if(neighbors.length>0){
                    return cell
                }
            }
            path.push(cell)
        }
    }
    return undefined
}

export const huntAndKill=(grid:Cell[][],rows:number,cols:number)=>{
    let currentCell=getRandomCell(grid)

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
            removeWalls(currentCell,neighbor)
            currentCell=neighbor
        }else{
            let cell=hunt(grid,rows,cols,path)
            if(cell){
                currentCell=cell
                remaining--
                currentCell.visited=true
                path.push(currentCell)
            }
        }
    }

    return path
    
}