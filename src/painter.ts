import Cell from "./cell";
import { GridManager } from "./manager";

export class CellPainter {
  constructor(public ctx: CanvasRenderingContext2D) {}

  drawCells(manager: GridManager) {
    this.ctx.clearRect(0, 0, manager.width, manager.height);
    for (let row of manager.grid) {
      for (let cell of row) {
        this.drawCell(cell);
      }
    }
  }

  drawCell(cell: Cell) {
    const x = cell.col * cell.cellWidth;
    const y = cell.row * cell.cellHeight;

    this.ctx.fillStyle = cell.visited ? "#282828" : "#1d2021";
    this.ctx.fillRect(x, y, cell.cellWidth, cell.cellHeight);

    this.ctx.strokeStyle = "#3c3836";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    if (cell.walls.top) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + cell.cellWidth, y);
    }
    if (cell.walls.right) {
      this.ctx.moveTo(x + cell.cellWidth, y);
      this.ctx.lineTo(x + cell.cellWidth, y + cell.cellHeight);
    }
    if (cell.walls.bottom) {
      this.ctx.moveTo(x + cell.cellWidth, y + cell.cellHeight);
      this.ctx.lineTo(x, y + cell.cellHeight);
    }
    if (cell.walls.left) {
      this.ctx.moveTo(x, y + cell.cellHeight);
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }

  highlight(cell: Cell) {
    const x = cell.col * cell.cellWidth;
    const y = cell.row * cell.cellHeight;

    this.ctx.fillStyle = "#665c54";
    this.ctx.fillRect(x, y, cell.cellWidth, cell.cellHeight);
  }
}
