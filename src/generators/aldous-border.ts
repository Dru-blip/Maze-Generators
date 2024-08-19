import Cell from "../cell";
import { getRandomNumber, removeWalls } from "../utils";

/**
 * Performs a random walk on a grid, traversing unvisited cells and removing walls between adjacent cells.
 *
 * @param {Cell[][]} grid - The grid to perform the random walk on.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} An array of cells representing the path taken during the random walk.
 */
export const randomWalk = (grid: Cell[][], rows: number, cols: number) => {
  let path: Cell[] = [];

  let current = grid[0][0];

  // no of unvisited cells
  let remaining = rows * cols;

  current.visited = true;
  remaining--;
  path.push(current);

  while (remaining > 0) {
    let neighbors = current.getNeighbors(grid, rows, cols);
    let index = getRandomNumber(neighbors.length);
    let neighbor = neighbors[index];

    if (neighbor) {
      if (!neighbor.visited) {
        remaining--;
        neighbor.visited = true;
        path.push(neighbor);
        removeWalls(current, neighbor);
      }
      current = neighbor;
    }
  }

  return path;
};
