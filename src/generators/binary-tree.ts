import Cell from "../cell";
import { checkBounds, getRandomNumber, removeWall } from "../utils";

/**
 * Generates a binary tree maze by traversing a grid and removing walls between adjacent cells.
 *
 * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} An array of Cell objects representing the path taken during the maze generation.
 */
export const binaryTree = (grid: Cell[][], rows: number, cols: number) => {
  let path: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let current = grid[row][col];
      current.visited = true;
      path.push(current);
      let neighbors = [];
      for (const direction of [
        [1, 0, "bottom"],
        [0, 1, "right"],
      ]) {
        let neighbor_row = row + (direction[0] as number);
        let neighbor_col = col + (direction[1] as number);
        if (checkBounds(rows, cols, neighbor_row, neighbor_col)) {
          neighbors.push([neighbor_row, neighbor_col, direction[2]]);
        }
      }

      if (neighbors.length > 0) {
        let neighbor = neighbors[getRandomNumber(neighbors.length)];
        let neighbor_cell = grid[neighbor[0] as number][neighbor[1] as number];
        let direction = neighbor[2] as string;
        removeWall(current, neighbor_cell, direction);
      }
    }
  }

  return path;
};
