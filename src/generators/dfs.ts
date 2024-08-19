import Cell from "../cell";
import { removeWalls } from "../utils";

/**
 * Performs a depth-first search on a grid, traversing unvisited cells and removing walls between adjacent cells.
 *
 * @param {Cell[][]} grid - The grid to perform the depth-first search on.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} An array of cells representing the path taken during the depth-first search.
 */
export const dfs = (grid: Cell[][], rows: number, cols: number) => {
  let current = grid[0][0];
  let stack: Cell[] = [];

  // no of unvisited cells
  let remaining = rows * cols;

  current.visited = true;
  remaining--;

  let path: Cell[] = [];
  path.push(current);

  while (remaining > 0) {
    let neighbor = current.getRandomNeighbor(grid, rows, cols);

    if (neighbor) {
      neighbor.visited = true;
      remaining--;
      removeWalls(current, neighbor);
      stack.push(current);
      path.push(neighbor);
      current = neighbor;
    } else if (stack.length > 0) {
      current = stack.pop()!;
    }
  }
  return path;
};
