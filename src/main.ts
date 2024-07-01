import Cell from './cell'
import  generators from './generators'
import solvers from './solvers'
import './style.css'

const grid: Cell[][] = []

const container = document.getElementById("container")!
const generateBtn = document.getElementById("generate")!
const solverBtn = document.getElementById("solver")!
const algorithmSelector=document.getElementById("algo-selector") as HTMLSelectElement


const width: number = 900
const height: number = 900;

// default cell width and height
let cellWidth: number =30
let cellHeight: number = 30

let no_cols: number = Math.floor(width / cellWidth)
let no_rows: number = Math.floor(height / cellHeight)


container.style.display = "grid"
container.style.gridTemplateColumns = `repeat(${no_cols},1fr)`

//initializing cells  
for (let i = 0; i < no_rows; i++) {
    let row = []
    for (let j = 0; j < no_cols; j++) {
        let newCell = document.createElement("div")
        newCell.setAttribute("id", `${i}-${j}`)
        newCell.style.width = `${cellWidth}px`
        newCell.style.height = `${cellHeight}px`
        newCell.classList.add('cell')

        container?.appendChild(newCell)
        row.push(new Cell(i, j, cellWidth, cellHeight, false,false))
    }
    grid.push(row)
}




generateBtn.addEventListener("click", () => {
    let algotithm=algorithmSelector.value
    let path:Cell[]=[]

    switch(algotithm){
        case 'prims':{
            path = generators.prims(grid, no_rows, no_cols)
            break
        }
        case 'kruskals':{
            path=generators.kruskal(grid, no_rows, no_cols)
            break
        }
        case 'binary-tree':{
            path=generators.binaryTree(grid, no_rows, no_cols)
            break
        }
        case 'random-walk':{
            path=generators.randomWalk(grid, no_rows, no_cols)
            break
        }
        default:{
            path=generators.dfs(grid, no_rows, no_cols)
            break
        }
    }
    

    for (let index = 0; index < path.length; index++) {
        const cell = path[index]

        setTimeout(() => {
            cell.highlight()
        }, index * 5)

        setTimeout(() => {
            cell.draw()
        }, (index + 1) * 5)
    }
})



solverBtn.addEventListener("click",()=>{
    let path=solvers.gbefs(grid,grid[0][0],grid[no_rows-1][no_cols-1])
    
    for (let index = 0; index < path.length; index++) {
        const cell = path[index]
        
        setTimeout(() => {
            cell.highlight()
        }, index * 20)

        setTimeout(() => {
            cell.drawSolved()
        }, (index + 1) * 20)
    }
})

