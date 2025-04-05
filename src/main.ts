import "./style.css"
import Cell from "./cell";
import generators from "./generators";
import solvers from "./solvers";
import { resetGrid } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const generateBtn = document.getElementById("generate")!;
const solverBtn = document.getElementById("solver")!;
const algorithmSelector = document.getElementById("algo-selector") as HTMLSelectElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

let cellWidth = 20;
let cellHeight = 20;

let no_cols = Math.floor(width / cellWidth);
let no_rows = Math.floor(height / cellHeight);

const grid: Cell[][] = [];

// Initialize grid (logic only, no HTML elements)
const initGrid = () => {
  for (let i = 0; i < no_rows; i++) {
    let row: Cell[] = [];
    for (let j = 0; j < no_cols; j++) {
      const cell = new Cell(i, j, cellWidth, cellHeight, false, false);
      row.push(cell);
    }
    grid.push(row);
  }
};

// Draw all cells
const drawGrid = () => {
  ctx.clearRect(0, 0, width, height);
  for (let row of grid) {
    for (let cell of row) {
      cell.draw(ctx);
    }
  }
};

initGrid();
drawGrid();

generateBtn.addEventListener("click", () => {
  resetGrid(grid);
  drawGrid();

  let algorithm = algorithmSelector.value;
  let path: Cell[] = [];

  switch (algorithm) {
    case "prims":
      path = generators.prims(grid, no_rows, no_cols);
      break;
    case "kruskals":
      path = generators.kruskal(grid, no_rows, no_cols);
      break;
    case "binary-tree":
      path = generators.binaryTree(grid, no_rows, no_cols);
      break;
    case "random-walk":
      path = generators.randomWalk(grid, no_rows, no_cols);
      break;
    case "hunt-kill":
      path = generators.huntAndKill(grid, no_rows, no_cols);
      break;
    default:
      path = generators.dfs(grid, no_rows, no_cols);
      break;
  }

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cell.highlight(ctx);
    }, index * 4);

    setTimeout(() => {
      cell.draw(ctx);
    }, (index + 1) * 4);
  }
});

solverBtn.addEventListener("click", () => {
  let path = solvers.bfs(grid, grid[0][0], grid[no_rows - 1][no_cols - 1]);

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cell.highlight(ctx);
    }, index * 20);

    setTimeout(() => {
      cell.drawSolved(ctx);
    }, (index + 1) * 20);
  }
});
