import "./style.css";

import Cell from "./cell";
import { CellPainter } from "./painter";
import generators from "./generators";
import { GridManager } from "./manager";
import solvers from "./solvers";
import { midPoint } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const generateBtn = document.getElementById("generate")!;
const solverBtn = document.getElementById("solver")!;
const algorithmSelector = document.getElementById(
  "algo-selector"
) as HTMLSelectElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

const manager = new GridManager(10, width, height);
const cellPainter = new CellPainter(ctx);

manager.initGrid();
cellPainter.drawCells(manager);

generateBtn.addEventListener("click", () => {
  const { grid, noCols, noRows } = manager;
  manager.resetGrid();
  cellPainter.drawCells(manager);

  let algorithm = algorithmSelector.value;
  let path: Cell[] = [];

  switch (algorithm) {
    case "prims":
      path = generators.prims(grid, noRows, noCols);
      break;
    case "kruskals":
      path = generators.kruskal(grid, noRows, noCols);
      break;
    case "binary-tree":
      path = generators.binaryTree(grid, noRows, noCols);
      break;
    case "random-walk":
      path = generators.randomWalk(grid, noRows, noCols);
      break;
    case "hunt-kill":
      path = generators.huntAndKill(grid, noRows, noCols);
      break;
    default:
      path = generators.dfs(grid, noRows, noCols);
      break;
  }

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cellPainter.highlight(cell);
    }, index * 2);

    setTimeout(() => {
      cellPainter.drawCell(cell);
    }, (index + 1) * 2);
  }
});

solverBtn.addEventListener("click", () => {
  const { grid, noCols, noRows } = manager;
  let path = solvers.dfs(grid, grid[0][0], grid[noRows - 1][noCols - 1]);

  ctx.beginPath();
  for (let i = 0; i < path.length - 1; i++) {
    setTimeout(() => {
      const pathStart = midPoint(path[i]);
      const pathEnd = midPoint(path[i + 1]);

      // ctx.strokeStyle = "#fabd2f";
      ctx.strokeStyle = "#79740e";

      ctx.moveTo(pathStart.x, pathStart.y);
      ctx.lineTo(pathEnd.x, pathEnd.y);
      ctx.stroke();
    }, i * 5);
  }
});
