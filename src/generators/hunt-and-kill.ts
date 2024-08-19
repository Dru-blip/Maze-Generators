import Cell from "../cell";
import { getRandomCell, removeWalls } from "../utils";

/**
 * Finds an unvisited cell with a visited neighbor in the grid.
 *
 * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @param {Cell[]} path - The current path of visited cells.
 * @return {[Cell, Cell] | undefined} An array containing the unvisited cell and its visited neighbor, or undefined if no such pair is found.
 */
const hunt = (grid: Cell[][], rows: number, cols: number, path: Cell[]) => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cell = grid[row][col];
      if (!cell.visited) {
        let neighbor = cell.getRandomVisitedNeighbor(grid, rows, cols);
        if (neighbor) {
          return [cell, neighbor];
        }
      }
      // path.push(cell)
    }
  }
  return undefined;
};

/**
 * Performs a Hunt and Kill algorithm on a grid to generate a maze.
 *
 * The algorithm starts at a random cell and explores the grid by moving to unvisited neighboring cells.
 * When a dead end is reached, the algorithm backtracks to a cell with unvisited neighbors.
 *
 * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} An array of Cell objects representing the path taken during the maze generation.
 */
export const huntAndKill = (grid: Cell[][], rows: number, cols: number) => {
  let currentCell = getRandomCell(grid);

  let remaining = rows * cols;
  let path: Cell[] = [];
  currentCell.visited = true;
  remaining--;
  path.push(currentCell);

  while (remaining > 0) {
    let neighbor = currentCell.getRandomNeighbor(grid, rows, cols);
    if (neighbor) {
      neighbor.visited = true;
      remaining--;
      path.push(neighbor);
      removeWalls(neighbor, currentCell);
      currentCell = neighbor;
    } else {
      let cell;
      [currentCell, cell] = hunt(grid, rows, cols, path)!;
      if (cell) {
        currentCell.visited = true;
        remaining--;
        path.push(currentCell);
        removeWalls(currentCell, cell);
        currentCell = cell;
      }
    }
  }

  return path;
};
