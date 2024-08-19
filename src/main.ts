import Cell from "./cell";
import generators from "./generators";
import solvers from "./solvers";
import "./style.css";
import { resetGrid } from "./utils";

const grid: Cell[][] = [];

const container = document.getElementById("container")!;
const generateBtn = document.getElementById("generate")!;
const solverBtn = document.getElementById("solver")!;
const algorithmSelector = document.getElementById(
  "algo-selector"
) as HTMLSelectElement;

const width: number = 800;
const height: number = 800;

// default cell width and height
let cellWidth: number = 20;
let cellHeight: number = 20;

let no_cols: number = Math.floor(width / cellWidth);
let no_rows: number = Math.floor(height / cellHeight);

container.style.display = "grid";
container.style.gridTemplateColumns = `repeat(${no_cols},1fr)`;

const initGridHtml = () => {
  for (let i = 0; i < no_rows; i++) {
    let row = [];
    for (let j = 0; j < no_cols; j++) {
      let newCell = document.createElement("div");
      newCell.setAttribute("id", `${i}-${j}`);
      newCell.style.width = `${cellWidth}px`;
      newCell.style.height = `${cellHeight}px`;

      container?.appendChild(newCell);
      const cell = new Cell(i, j, cellWidth, cellHeight, false, false);
      newCell.classList.add("cell");
      row.push(cell);
    }
    grid.push(row);
  }
};

initGridHtml();

generateBtn.addEventListener("click", () => {
  resetGrid(grid);

  let algotithm = algorithmSelector.value;
  let path: Cell[] = [];

  switch (algotithm) {
    case "prims": {
      path = generators.prims(grid, no_rows, no_cols);
      break;
    }
    case "kruskals": {
      path = generators.kruskal(grid, no_rows, no_cols);
      break;
    }
    case "binary-tree": {
      path = generators.binaryTree(grid, no_rows, no_cols);
      break;
    }
    case "random-walk": {
      path = generators.randomWalk(grid, no_rows, no_cols);
      break;
    }
    case "hunt-kill": {
      path = generators.huntAndKill(grid, no_rows, no_cols);
      break;
    }
    default: {
      path = generators.dfs(grid, no_rows, no_cols);
      break;
    }
  }

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cell.highlight();
    }, index * 4);

    setTimeout(() => {
      cell.draw();
    }, (index + 1) * 4);
  }
});

solverBtn.addEventListener("click", () => {
  let path = solvers.bfs(grid, grid[0][0], grid[no_rows - 1][no_cols - 1]);

  for (let index = 0; index < path.length; index++) {
    const cell = path[index];

    setTimeout(() => {
      cell.highlight();
    }, index * 20);

    setTimeout(() => {
      cell.drawSolved();
    }, (index + 1) * 20);
  }
});
