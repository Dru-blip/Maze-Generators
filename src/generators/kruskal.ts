import Cell from "../cell";
import { checkBounds, find, removeWalls, union } from "../utils";

interface Edge {
  row: number;
  col: number;
  direction: string;
}

/**
 * Creates a shuffled list of edges for a given grid, where each edge represents a potential connection between two adjacent cells.
 *
 * @param {Cell[][]} grid - A 2D array of Cell objects representing the grid.
 * @return {Edge[]} A shuffled list of Edge objects, where each Edge represents a potential connection between two adjacent cells.
 */
const createEdgeList = (grid: Cell[][]): Edge[] => {
  let edges: Edge[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      edges.push({ row, col, direction: "bottom" });
      edges.push({ row, col, direction: "right" });
    }
  }

  const shuffled = edges.slice();
  let currentIndex = shuffled.length;
  let temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }
  return shuffled;
};

/**
 * Generates a minimum spanning tree (MST) of a grid using Kruskal's algorithm.
 *
 * @param {Cell[][]} grid - The 2D array representing the grid.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @return {Cell[]} An array of Cell objects representing the minimum spanning tree.
 */
export const kruskal = (grid: Cell[][], rows: number, cols: number) => {
  let path: Set<Cell> = new Set();
  let edgeList: Edge[] = createEdgeList(grid);
  while (edgeList.length > 0) {
    let edge = edgeList.pop();
    if (edge) {
      let set1 = grid[edge.row][edge.col];
      let set2 = undefined;

      if (edge.direction === "bottom") {
        if (checkBounds(rows, cols, edge.row + 1, edge.col)) {
          set2 = grid[edge.row + 1][edge.col];
        }
      } else {
        if (checkBounds(rows, cols, edge.row, edge.col + 1)) {
          set2 = grid[edge.row][edge.col + 1];
        }
      }

      if (set2) {
        let root1 = find(set1);
        let root2 = find(set2);

        if (root1 !== root2) {
          union(root1, root2);
          removeWalls(set1, set2);
        }
        set1.visited = true;
        set2.visited = true;
        if (!path.has(set1)) {
          path.add(set1);
        }
        if (!path.has(set2)) {
          path.add(set2);
        }
      }
    } else {
      continue;
    }
  }
  return Array.from(path);
};
