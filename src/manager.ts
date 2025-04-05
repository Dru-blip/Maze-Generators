import Cell from "./cell";

export class GridManager {
  cellSize: number;
  wallThickness: number;
  grid: Cell[][];
  width: number;
  height: number;
  cellHeight: number;
  cellWidth: number;
  noRows: number;
  noCols: number;

  constructor(width: number, height: number) {
    this.cellSize = 20;
    this.wallThickness = 2;
    this.grid = [];
    this.width = width;
    this.height = height;
    this.cellHeight = this.cellSize;
    this.cellWidth = this.cellSize;
    this.noRows = Math.floor(height / this.cellSize);
    this.noCols = Math.floor(width / this.cellSize);
  }

  initGrid() {
    for (let i = 0; i < this.noRows; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < this.noCols; j++) {
        const cell = new Cell(
          i,
          j,
          this.cellWidth,
          this.cellHeight,
          false,
          false,
        );
        row.push(cell);
      }
      this.grid.push(row);
    }
  }

  resetGrid() {
    for (let i = 0; i < this.noRows; i++) {
      for (let j = 0; j < this.noCols; j++) {
        this.grid[i][j].reset();
      }
    }
  }
}
