import Cell from "./cell";
import { CellPainter } from "./painter";
import generators from "./generators";
import { GridManager } from "./manager";
import solvers from "./solvers";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const generateBtn = document.getElementById("generate")!;
const solverBtn = document.getElementById("solver")!;
const algorithmSelector = document.getElementById(
  "algo-selector",
) as HTMLSelectElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

const manager = new GridManager(width, height);
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
    }, index * 4);

    setTimeout(
      () => {
        cellPainter.drawCell(cell);
      },
      (index + 1) * 4,
    );
  }
});

solverBtn.addEventListener("click", () => {
  const { grid, noCols, noRows } = manager;
  let path = solvers.bfs(grid, grid[0][0], grid[noRows - 1][noCols - 1]);

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cellPainter.highlight(cell);
    }, index * 20);

    setTimeout(
      () => {
        cellPainter.drawCell(cell);
      },
      (index + 1) * 20,
    );
  }
});
