import Cell from "../cell";
import { constructWalkablePath, isWalkable } from "../utils";

/**
 * Performs a Breadth-First Search (BFS) on a grid to find the shortest path from a start cell to an end cell.
 *
 * @param {Cell[][]} grid - A 2D grid of Cell objects.
 * @param {Cell} start - The starting cell for the search.
 * @param {Cell} end - The target cell for the search.
 * @return {Cell[]} The shortest path from the start cell to the end cell.
 */
export const bfs = (grid: Cell[][], start: Cell, end: Cell) => {
  let queue: Cell[] = [];
  let cameFrom: Map<Cell, Cell> = new Map();

  queue.push(start);

  while (queue.length > 0) {
    let current = queue.shift()!;
    if (current) {
      current.isWalked = true;
      if (current.row === end.row && current.col === end.col) {
        console.log("reached");
        break;
      }
      let neighbors = current.getNeighbors(grid, grid.length, grid[0].length);
      for (const neighbor of neighbors) {
        if (!neighbor.isWalked && isWalkable(current, neighbor)) {
          queue.push(neighbor);
          neighbor.isWalked = true;
          cameFrom.set(neighbor, current);
        }
      }
    } else {
      break;
    }
  }

  return constructWalkablePath(cameFrom, start, end);
};
