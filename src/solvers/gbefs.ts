// greedy best first search

import { PriorityQueue } from "@datastructures-js/priority-queue";
import Cell from "../cell";
import { constructWalkablePath, hcostComparator, isWalkable } from "../utils";


export const gbefs=(grid:Cell[][],start:Cell,end:Cell)=>{

    let pq=new PriorityQueue(hcostComparator)
    let cameFrom: Map<Cell, Cell> = new Map()

    pq.enqueue(start)

    while(!pq.isEmpty()){
        let current=pq.dequeue()
        current.isWalked=true
        if (current.row === end.row && current.col === end.col) {
            console.log("reached")
            break
        }

        let neighbors=current.getNeighbors(grid,grid.length,grid[0].length)
        for (const neighbor of neighbors) {
            if(!neighbor.isWalked && isWalkable(current,neighbor)){
                neighbor.calculateHcost(end)
                neighbor.isWalked=true
                pq.enqueue(neighbor)
                cameFrom.set(neighbor,current)
            }
        }
    }

    return constructWalkablePath(cameFrom,start,end)
}