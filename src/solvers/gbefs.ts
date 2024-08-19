// greedy best first search

import { PriorityQueue } from "@datastructures-js/priority-queue";
import Cell from "../cell";
import { constructWalkablePath, hcostComparator, isWalkable } from "../utils";


/**
 * Performs a Greedy Best First Search (GBFS) on a grid to find the shortest path from a start cell to an end cell.
 *
 * @param {Cell[][]} grid - A 2D grid of Cell objects.
 * @param {Cell} start - The starting cell for the search.
 * @param {Cell} end - The target cell for the search.
 * @return {Cell[]} The shortest path from the start cell to the end cell.
 */
export const gbefs = (grid: Cell[][], start: Cell, end: Cell) => {
  let pq = new PriorityQueue(hcostComparator);
  let cameFrom: Map<Cell, Cell> = new Map();

  pq.enqueue(start);

  while (!pq.isEmpty()) {
    let current = pq.dequeue();
    current.isWalked = true;
    if (current.row === end.row && current.col === end.col) {
      console.log("reached");
      break;
    }

    let neighbors = current.getNeighbors(grid, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      if (!neighbor.isWalked && isWalkable(current, neighbor)) {
        neighbor.calculateHcost(end);
        neighbor.isWalked = true;
        pq.enqueue(neighbor);
        cameFrom.set(neighbor, current);
      }
    }
  }

  return constructWalkablePath(cameFrom, start, end);
};
