import Cell from "../cell";
import { getRandomCell, getRandomNumber, removeWalls } from "../utils";

/**
 * Adds unvisited neighbors of the current cell to the frontiers list.
 *
 * @param {Cell[][]} grid - The grid of cells.
 * @param {Cell[]} frontiers - The list of cells in the frontiers.
 * @param {Cell} current - The current cell.
 */
const addFrontiers = (grid: Cell[][], frontiers: Cell[], current: Cell) => {
  let neighbors = current.getNeighbors(grid, grid.length, grid[0].length);
  neighbors.forEach((neighbor) => {
    if (!neighbor.visited && !frontiers.includes(neighbor)) {
      frontiers.push(neighbor);
    }
  });
};

/**
 * Returns a random cell from the given list of frontier cells.
 *
 * @param {Cell[]} frontiers - The list of frontier cells.
 * @return {Cell} A random cell from the list of frontier cells.
 */
const getRandomFrontier = (frontiers: Cell[]): Cell => {
  let index = getRandomNumber(frontiers.length);
  return frontiers.splice(index, 1)[0];
};

/**
 * Generates a maze path using Prim's algorithm.
 *
 * @param {Cell[][]} grid - The grid of cells.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} The generated maze path.
 */
export const prims = (grid: Cell[][], rows: number, cols: number): Cell[] => {
  let frontiers: Cell[] = [];
  let path: Cell[] = [];
  let startCell = getRandomCell(grid);

  startCell.visited = true;
  path.push(startCell);
  addFrontiers(grid, frontiers, startCell);

  while (frontiers.length > 0) {
    let frontier = getRandomFrontier(frontiers);
    frontier.visited = true;
    path.push(frontier);
    let neighbor = frontier.getRandomVisitedNeighbor(grid, rows, cols);
    if (neighbor) {
      removeWalls(neighbor, frontier);
    }
    addFrontiers(grid, frontiers, frontier);
  }

  return path;
};
