import Cell from "../cell";
import { ICompare } from "@datastructures-js/priority-queue";

/**
 * Compares two Cell objects based on their gcost values.
 *
 * @param {Cell} a - The first Cell object to compare.
 * @param {Cell} b - The second Cell object to compare.
 * @return {number} A negative value if a's gcost is less than b's, a positive value if a's gcost is greater than b's, and 0 if they are equal.
 */
export const gcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
  return a.gcost < b.gcost ? -1 : 1;
};

/**
 * Compares two Cell objects based on their hcost values.
 *
 * @param {Cell} a - The first Cell object to compare.
 * @param {Cell} b - The second Cell object to compare.
 * @return {number} A negative value if a's hcost is less than b's, a positive value if a's hcost is greater than b's, and 0 if they are equal.
 */
export const hcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
  return a.hcost < b.hcost ? -1 : 1;
};

/**
 * Compares two Cell objects based on their fcost values.
 *
 * @param {Cell} a - The first Cell object to compare.
 * @param {Cell} b - The second Cell object to compare.
 * @return {number} A negative value if a's fcost is less than b's, a positive value if a's fcost is greater than b's, and 0 if they are equal.
 */
export const fcostComparator: ICompare<Cell> = (a: Cell, b: Cell) => {
  return a.fcost < b.fcost ? -1 : 1;
};

/**
 * Calculates the Manhattan distance between two Cell objects.
 *
 * @param {Cell} a - The first Cell object.
 * @param {Cell} b - The second Cell object.
 * @return {number} The Manhattan distance between the two Cell objects.
 */
export const manhattanDistance = (a: Cell, b: Cell) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

/**
 * Calculates the Manhattan distance between two Cell objects.
 *
 * @param {Cell} a - The first Cell object.
 * @param {Cell} b - The second Cell object.
 * @return {number} The Manhattan distance between the two Cell objects.
 */
export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 * Resets all cells in the grid to their initial state.
 *
 * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
 * @return {void} No return value, the grid is modified in-place.
 */
export const resetGrid = (grid: Cell[][]) => {
  for (const row of grid) {
    for (const cell of row) {
      cell.reset();
    }
  }
};

/**
 * Constructs a walkable path from the end cell to the start cell using the cameFrom map.
 *
 * @param {Map<Cell, Cell>} cameFrom - A map of cells to their previous cells in the path.
 * @param {Cell} start - The starting cell of the path.
 * @param {Cell} end - The ending cell of the path.
 * @return {Cell[]} An array of cells representing the walkable path from the end cell to the start cell.
 */
export const constructWalkablePath = (
  cameFrom: Map<Cell, Cell>,
  start: Cell,
  end: Cell
) => {
  let path = [];
  let current = end;
  while (current.row !== start.row || current.col !== start.col) {
    path.push(current);
    let next = cameFrom.get(current)!;
    current.walkableDirection = getWalkableDirection(current, next)!;
    current = next;
  }
  path.push(start);
  path.reverse();
  return path;
};

/**
 * Determines the walkable direction between two cells.
 *
 * @param {Cell} a - The first cell.
 * @param {Cell} b - The second cell.
 * @return {string} The walkable direction ("top", "bottom", "left", or "right").
 */
export const getWalkableDirection = (a: Cell, b: Cell) => {
  let rowDiff = a.row - b.row;
  let colDiff = a.col - b.col;

  if (rowDiff === 1) {
    return "bottom";
  } else if (rowDiff === -1) {
    return "top";
  }

  if (colDiff === 1) {
    return "right";
  } else if (colDiff === -1) {
    return "left";
  }
};

/**
 * Checks if it is possible to walk between two cells.
 *
 * @param {Cell} a - The first cell.
 * @param {Cell} b - The second cell.
 * @return {boolean} True if it is possible to walk between the cells, false otherwise.
 */
export const isWalkable = (a: Cell, b: Cell) => {
  let rowDiff = a.row - b.row;
  let colDiff = a.col - b.col;

  if (rowDiff === 1) {
    return a.walls["top"] === false && b.walls["bottom"] === false;
  } else if (rowDiff === -1) {
    return a.walls["bottom"] === false && b.walls["top"] === false;
  }

  if (colDiff === 1) {
    return a.walls["left"] === false && b.walls["right"] === false;
  } else if (colDiff === -1) {
    return a.walls["right"] === false && b.walls["left"] === false;
  }
};

/**
 * Checks if the given row and column indices are within the bounds of a grid with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @param {number} row - The row index to check.
 * @param {number} col - The column index to check.
 * @return {boolean} True if the row and column indices are within the bounds of the grid, false otherwise.
 */

export const checkBounds = (
  rows: number,
  cols: number,
  row: number,
  col: number
) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

/**
 * Removes a wall between two cells in a specified direction.
 *
 * @param {Cell} a - The first cell.
 * @param {Cell} b - The second cell.
 * @param {string} direction - The direction of the wall to remove ("left", "right", "top", or "bottom").
 * @return {void}
 */
export const removeWall = (a: Cell, b: Cell, direction: string) => {
  if (direction === "left") {
    a.walls["left"] = false;
    b.walls["right"] = false;
  }

  if (direction === "right") {
    a.walls["right"] = false;
    b.walls["left"] = false;
  }

  if (direction === "top") {
    a.walls["top"] = false;
    b.walls["bottom"] = false;
  }

  if (direction === "bottom") {
    a.walls["bottom"] = false;
    b.walls["top"] = false;
  }
};

/**
 * Removes the walls between two adjacent cells.
 *
 * @param {Cell} a - The first cell.
 * @param {Cell} b - The second cell.
 * @return {void}
 */
export const removeWalls = (a: Cell, b: Cell) => {
  let rowDiff = a.row - b.row;
  let colDiff = a.col - b.col;

  if (rowDiff === 1) {
    a.walls["top"] = false;
    b.walls["bottom"] = false;
  } else if (rowDiff === -1) {
    a.walls["bottom"] = false;
    b.walls["top"] = false;
  }

  if (colDiff === 1) {
    a.walls["left"] = false;
    b.walls["right"] = false;
  } else if (colDiff === -1) {
    a.walls["right"] = false;
    b.walls["left"] = false;
  }
};

/**
 * Returns a randomly selected cell from a 2D grid of cells.
 *
 * @param {Cell[][]} grid - The 2D grid of cells.
 * @return {Cell} The randomly selected cell.
 */
export const getRandomCell = (grid: Cell[][]) => {
  let row = getRandomNumber(grid.length);
  let col = getRandomNumber(grid[0].length);
  return grid[row][col];
};


/**
 * Checks if there are any unvisited cells in a given grid.
 *
 * @param {Cell[][]} grid - The 2D grid of cells to check.
 * @return {boolean} True if there are any unvisited cells, false otherwise.
 */
export const anyUnvisitedCells = (grid: Cell[][]) => {
  for (const cells of grid) {
    for (const cell of cells) {
      if (!cell.visited) return true;
    }
  }
  return false;
};


/**
 * Returns the first unvisited cell in a given grid.
 *
 * @param {Cell[][]} grid - The 2D grid of cells to search.
 * @return {Cell} The first unvisited cell, or undefined if all cells are visited.
 */
export const getFirstUnvisitedCell = (grid: Cell[][]) => {
  for (const cells of grid) {
    for (const cell of cells) {
      if (!cell.visited) return cell;
    }
  }
};

/**
 * Finds the root of a given cell in a disjoint set.
 *
 * @param {Cell} a - The cell to find the root of.
 * @return {Cell} The root of the given cell.
 */
export const find = (a: Cell) => {
  let root = a;
  while (root.parent !== root) {
    root = root.parent;
  }
  return root;
};

/**
 * Unites two disjoint sets containing the given cells.
 *
 * @param {Cell} a - The first cell.
 * @param {Cell} b - The second cell.
 * @return {void}
 */
export const union = (a: Cell, b: Cell) => {
  let set1 = find(a);
  let set2 = find(b);

  if (set1 !== set2) {
    set2.parent = set1;
  }
};
