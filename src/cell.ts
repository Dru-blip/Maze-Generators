import { getRandomNumber, manhattanDistance } from "./utils";

export default class Cell {
  public walls = { left: true, right: true, top: true, bottom: true };
  public parent: Cell = this;
  constructor(
    public row: number,
    public col: number,
    public cellWidth: number,
    public cellHeight: number,
    public visited: boolean = false,
    public isWalked: boolean = false,
    public walkableDirection: string = "",
    public fcost: number = 0,
    public gcost: number = 0,
    public hcost: number = 0
  ) {}

  /**
   * Calculates the heuristic cost (h-cost) of the current cell relative to another cell.
   *
   * @param {Cell} other - The cell to which the h-cost is being calculated.
   * @return {void} No return value. The h-cost is stored in the current cell's hcost property.
   */
  calculateHcost(other: Cell) {
    this.hcost = manhattanDistance(this, other);
  }

  /**
   * Retrieves the neighboring cells of the current cell within a grid.
   *
   * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
   * @param {number} rows - The number of rows in the grid.
   * @param {number} cols - The number of columns in the grid.
   * @param {number[][]} [offsets] - An optional array of offset pairs to use for neighbor calculation.
   * @return {Cell[]} An array of neighboring Cell objects.
   */
  getNeighbors(
    grid: Cell[][],
    rows: number,
    cols: number,
    offsets?: number[][]
  ) {
    let neighbors = [];
    if (!offsets) {
      offsets = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ];
    }
    for (const offset of offsets) {
      let row = this.row + offset[0];
      let col = this.col + offset[1];
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        neighbors.push(grid[row][col]);
      }
    }
    return neighbors;
  }

  /**
   * Retrieves a random visited neighboring cell within a grid.
   *
   * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
   * @param {number} rows - The number of rows in the grid.
   * @param {number} cols - The number of columns in the grid.
   * @return {Cell | null} A random visited neighboring Cell object, or null if no visited neighbors exist.
   */
  getRandomVisitedNeighbor(
    grid: Cell[][],
    rows: number,
    cols: number
  ): Cell | null {
    let neighbors = this.getNeighbors(grid, rows, cols);
    let visitedNeighbors = neighbors.filter((neighbor) => neighbor.visited);
    if (visitedNeighbors.length > 0) {
      return visitedNeighbors[getRandomNumber(visitedNeighbors.length)];
    }
    return null;
  }

  /**
   * Retrieves a random unvisited neighboring cell within a grid.
   *
   * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
   * @param {number} rows - The number of rows in the grid.
   * @param {number} cols - The number of columns in the grid.
   * @param {number[][]} [offsets] - An optional array of offset pairs to use for neighbor calculation.
   * @return {Cell | undefined} A random unvisited neighboring Cell object, or undefined if no unvisited neighbors exist.
   */
  getRandomNeighbor(
    grid: Cell[][],
    rows: number,
    cols: number,
    offsets?: number[][]
  ) {
    let neighbors = this.getNeighbors(grid, rows, cols, offsets);
    neighbors = neighbors.filter((cell) => !cell.visited);
    if (neighbors.length > 0) {
      let rand = getRandomNumber(neighbors.length);
      return neighbors[rand];
    } else {
      return undefined;
    }
  }

  /**
   * Highlights a cell in the grid by adding the 'highlight-cell' class to its DOM element.
   *
   * @return {void} No return value.
   */
  highlight() {
    let ele = document.getElementById(`${this.row}-${this.col}`)!;
    ele.classList.add("highlight-cell");
  }

  /**
   * Draws a solved cell in the grid by adding the 'solved-cell' class to its DOM element and setting an indicator icon based on the walkable direction.
   *
   * @return {void} No return value.
   */
  drawSolved() {
    let ele = document.getElementById(`${this.row}-${this.col}`)!;
    let indicator = document.createElement("ion-icon");
    // let line = document.createElement("hr")

    // line.style.width="20%"
    // line.style.height="20%"
    // line.style.borderRadius="100%"
    // line.style.backgroundColor="#98971a"
    switch (this.walkableDirection) {
      case "left": {
        indicator.setAttribute("name", "chevron-back-outline");
        break;
      }
      case "right": {
        indicator.setAttribute("name", "chevron-forward-outline");
        break;
      }
      case "top": {
        indicator.setAttribute("name", "chevron-up-outline");
        break;
      }
      case "bottom": {
        indicator.setAttribute("name", "chevron-down-outline");
        break;
      }
      default: {
        break;
      }
    }

    // ele.style.backgroundColor = "#427b58"
    // indicator.style.borderRadius="10px"
    ele.classList.remove("highlight-cell");
    ele.classList.remove("visited-cell");
    ele.classList.add("solved-cell");
    // ele.appendChild(indicator)
    // ele.appendChild(line)
    // ele.style.backgroundColor = "#98971a"
    // ele.style.backgroundColor = "#076678"

    // ele.style.backgroundColor = "#83a598"
  }

  /**
   * Resets the cell to its initial state.
   *
   * Removes all border classes, solved and visited cell classes, and resets the cell's properties.
   *
   * @return {void}
   */
  reset() {
    let ele = document.getElementById(`${this.row}-${this.col}`)!;

    ele.classList.remove("border-left");
    ele.classList.remove("border-right");
    ele.classList.remove("border-top");
    ele.classList.remove("border-bottom");

    ele.classList.remove("solved-cell");
    ele.classList.remove("visited-cell");
    ele.classList.add("cell");

    this.isWalked = false;
    this.visited = false;
    this.walls = { left: true, right: true, top: true, bottom: true };
    this.parent = this;
  }

  /**
   * Draws the cell on the grid by adding or removing CSS classes based on its properties.
   *
   * @return {void}
   */
  draw() {
    let ele = document.getElementById(`${this.row}-${this.col}`)!;
    ele.classList.remove("cell");

    //top
    if (this.walls["top"]) {
      ele.classList.add("border-top");
    }

    //left
    if (this.walls["left"]) {
      ele.classList.add("border-left");
    }

    //bottom
    if (this.walls["bottom"]) {
      ele.classList.add("border-bottom");
    }

    //right
    if (this.walls["right"]) {
      ele.classList.add("border-right");
    }

    if (this.visited) {
      ele.classList.remove("highlight-cell");
      // ele.style.backgroundColor = "#0ABAB5"
      ele.classList.add("visited-cell");
      // ele.style.backgroundColor = "#d65d08"
    }
  }
}
