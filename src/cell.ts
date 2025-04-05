import { manhattanDistance, getRandomNumber } from "./utils";

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

  calculateHcost(other: Cell) {
    this.hcost = manhattanDistance(this, other);
  }

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
    for (const [dx, dy] of offsets) {
      const newRow = this.row + dx;
      const newCol = this.col + dy;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        neighbors.push(grid[newRow][newCol]);
      }
    }
    return neighbors;
  }

  getRandomVisitedNeighbor(
    grid: Cell[][],
    rows: number,
    cols: number
  ): Cell | null {
    const visited = this.getNeighbors(grid, rows, cols).filter(
      (c) => c.visited
    );
    return visited.length > 0 ? visited[getRandomNumber(visited.length)] : null;
  }

  getRandomNeighbor(
    grid: Cell[][],
    rows: number,
    cols: number,
    offsets?: number[][]
  ) {
    const unvisited = this.getNeighbors(grid, rows, cols, offsets).filter(
      (c) => !c.visited
    );
    return unvisited.length > 0
      ? unvisited[getRandomNumber(unvisited.length)]
      : undefined;
  }

  reset() {
    this.isWalked = false;
    this.visited = false;
    this.walls = { left: true, right: true, top: true, bottom: true };
    this.parent = this;
    this.walkableDirection = "";
  }

  get topLeft() {
    return {
      x: this.col * this.cellWidth,
      y: this.row * this.cellHeight,
    };
  }

  get topRight() {
    return {
      x: (this.col + 1) * this.cellWidth,
      y: this.row * this.cellHeight,
    };
  }

  get bottomLeft() {
    return {
      x: this.col * this.cellWidth,
      y: (this.row + 1) * this.cellHeight,
    };
  }

  get bottomRight() {
    return {
      x: (this.col + 1) * this.cellWidth,
      y: (this.row + 1) * this.cellHeight,
    };
  }
}
