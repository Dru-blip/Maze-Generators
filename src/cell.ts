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

  getNeighbors(grid: Cell[][], rows: number, cols: number, offsets?: number[][]) {
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

  getRandomVisitedNeighbor(grid: Cell[][], rows: number, cols: number): Cell | null {
    const visited = this.getNeighbors(grid, rows, cols).filter((c) => c.visited);
    return visited.length > 0 ? visited[getRandomNumber(visited.length)] : null;
  }

  getRandomNeighbor(grid: Cell[][], rows: number, cols: number, offsets?: number[][]) {
    const unvisited = this.getNeighbors(grid, rows, cols, offsets).filter((c) => !c.visited);
    return unvisited.length > 0 ? unvisited[getRandomNumber(unvisited.length)] : undefined;
  }

  reset() {
    this.isWalked = false;
    this.visited = false;
    this.walls = { left: true, right: true, top: true, bottom: true };
    this.parent = this;
    this.walkableDirection = "";
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.col * this.cellWidth;
    const y = this.row * this.cellHeight;

    // Base background
    ctx.fillStyle = this.visited ? "#282828" : "#1d2021"; // visited vs unvisited
    ctx.fillRect(x, y, this.cellWidth, this.cellHeight);

    // Walls
    ctx.strokeStyle = "#3c3836";
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (this.walls.top) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.cellWidth, y);
    }
    if (this.walls.right) {
      ctx.moveTo(x + this.cellWidth, y);
      ctx.lineTo(x + this.cellWidth, y + this.cellHeight);
    }
    if (this.walls.bottom) {
      ctx.moveTo(x + this.cellWidth, y + this.cellHeight);
      ctx.lineTo(x, y + this.cellHeight);
    }
    if (this.walls.left) {
      ctx.moveTo(x, y + this.cellHeight);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  drawSolved(ctx: CanvasRenderingContext2D) {
    const x = this.col * this.cellWidth;
    const y = this.row * this.cellHeight;

    // Fill for solved path
    ctx.fillStyle = "#458588"; // blue-green for solved path
    ctx.fillRect(x, y, this.cellWidth, this.cellHeight);

    // Directional arrow
    ctx.fillStyle = "#d5c4a1"; // light neutral text color
    ctx.font = `${this.cellWidth / 2}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let arrow = "";
    switch (this.walkableDirection) {
      case "left": arrow = "←"; break;
      case "right": arrow = "→"; break;
      case "top": arrow = "↑"; break;
      case "bottom": arrow = "↓"; break;
    }

    if (arrow) {
      ctx.fillText(arrow, x + this.cellWidth / 2, y + this.cellHeight / 2);
    }
  }

  highlight(ctx: CanvasRenderingContext2D) {
    const x = this.col * this.cellWidth;
    const y = this.row * this.cellHeight;

    ctx.fillStyle = "#665c54"; // dark tan/brown for highlighting
    ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
  }
}
