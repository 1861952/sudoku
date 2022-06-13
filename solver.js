// https://www.geeksforgeeks.org/sudoku-backtracking-7/

{/* <script> */}

// Javascript program for above approach

// N is the size of the 2D matrix N*N
let N = 9;

/* Takes a partially filled-in grid and attempts
to assign values to all unassigned locations in
such a way to meet the requirements for
Sudoku solution (non-duplication across rows,
columns, and boxes) */
function solveSudoku(grid, row, col)
{

/* If we have reached the 8th
row and 9th column (0
indexed matrix) ,
we are returning true to avoid further
backtracking */
if (row == N - 1 && col == N)
return true;

// Check if column value becomes 9 ,
// we move to next row
// and column start from 0
if (col == N)
{
row++;
col = 0;
}

// Check if the current position
// of the grid already
// contains value >0, we iterate
// for next column
if (grid[row][col] != 0)
return solveSudoku(grid, row, col + 1);

for(let num = 1; num < 10; num++)
{

// Check if it is safe to place
// the num (1-9) in the given
// row ,col ->we move to next column
if (isSafe(grid, row, col, num))
{

/* assigning the num in the current
(row,col) position of the grid and
assuming our assigned num in the position
is correct */
grid[row][col] = num;

// Checking for next
// possibility with next column
if (solveSudoku(grid, row, col + 1))
return true;
}

/* removing the assigned num , since our
assumption was wrong , and we go for next
assumption with diff num value */
grid[row][col] = 0;
}
return false;
}

/* A utility function to print grid */
function print(grid)
{
for(let i = 0; i < N; i++)
{
for(let j = 0; j < N; j++)
document.write(grid[i][j] + " ");

document.write("<br>");
}
}

// Check whether it will be legal
// to assign num to the
// given row, col
function isSafe(grid, row, col, num)
{

// Check if we find the same num
// in the similar row , we
// return false
for(let x = 0; x <= 8; x++)
if (grid[row][x] == num) {
return false;

        }

// Check if we find the same num
// in the similar column ,
// we return false
for(let x = 0; x <= 8; x++)
if (grid[x][col] == num) {
return false;
        }

// Check if we find the same num
// in the particular 3*3
// matrix, we return false
let startRow = row - row % 3,
startCol = col - col % 3;

for(let i = 0; i < 3; i++)
for(let j = 0; j < 3; j++)
if (grid[i + startRow][j + startCol] == num) {
return false;
            }

return true;
}

// check if problem is valid i.e. no duplicates in rows, columns or 3x3 squares
function isSquareSafe(grid) {

    // let gridx = [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
// [ 5, 2, 3, 0, 0, 0, 0, 0, 0 ],
// [ 3, 8, 7, 0, 0, 0, 0, 3, 1 ],
// [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
// [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
// [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
// [ 1, 3, 0, 0, 0, 0, 2, 5, 4 ],
// [ 0, 0, 0, 0, 0, 0, 2, 7, 4 ],
// [ 0, 0, 5, 2, 0, 6, 3, 4, 4 ] ]
    console.log(grid)
    // form 3x3 squares from 9x9 square
    const grid3x3 = []
    for(let i=0;i<3;i++) {
        for(let j=0;j<3;j++) {
            const m=3*i
            const n=3*j
            grid3x3.push([grid[m+0][n+0], grid[m+0][n+1], grid[m+0][n+2],
                        grid[m+1][n+0], grid[m+1][n+1], grid[m+1][n+2],
                        grid[m+2][n+0], grid[m+2][n+1], grid[m+2][n+2]])
        }
    }

    // check for duplicates in 3x3 squares
    for(let i=0; i<9; i++) {
        const duplicates = grid3x3[i].filter((item, index) => {
                // console.log(item, index, grid3x3[i].indexOf(item))
                return grid3x3[i].indexOf(item) !== index && item > 0
                }
            )

        if(duplicates.length > 0) {
            console.log('duplicates in 3x3 squares', duplicates)
            return false
        }
    }

    // form 9x1 squares from 9x9 square
    const grid9x1 = []
    for(let j=0;j<9;j++) {
            grid9x1.push([grid[0][j], grid[1][j], grid[2][j],
                        grid[3][j], grid[4][j], grid[5][j],
                        grid[6][j], grid[7][j], grid[8][j]])
    }

    // check for duplicated in cols
    for(let i=0; i<9; i++) {
        const duplicates = grid9x1[i].filter((item, index) => {
            return grid9x1[i].indexOf(item) !== index && item > 0
        })

        if(duplicates.length > 0) {
            console.log('duplicates in cols', duplicates)
            return false
        }
    }

    // check for duplicated in rows
    for(let i=0; i<9; i++) {
        const duplicates = grid[i].filter((item, index) => {
            return grid[i].indexOf(item) !== index && item > 0
        })

        if(duplicates.length > 0) {
            console.log('duplicates in rows', duplicates)
            return false
        }
    }

    return true
}

function str2arr (s) {
    let b = []
    let a = []
    for (let j=0; j<9; j++) {
        for (let i=9*j;i<9*j+9;i++){
            if (s[i] == '.') {
                b.push(0)
            } else {
                b.push(+s[i])
            }
        }
        a.push(b)
        b=[]
    }
    console.log('str2arr',a)
    return a
}

function arr2str (a) {
    let s = ''
    for (let i=0; i<9; i++) {
        for (let j=0;j<9;j++) {
            // console.log(a[i][j])
            s = s + a[i][j]
        }
    }
    console.log('arr2str',s)
    return s
}

const solverSudokuWrapper = (datastring) => {
    const grid = str2arr(datastring)
    // console.log('grid', grid)
    if(isSquareSafe(grid)) {
        if (solveSudoku(grid, 0, 0)) {
            // print(grid)
            // console.log('grid2',grid)
            const solution = arr2str(grid)
            // console.log('solution',solution)
            // populateValues(true, "This is the answer", solution)
            const data = {canBeSolved:true, message: "This is the answer", solution:solution}
            return data
        } else
            document.write("no solution exists ")
            const data = {canBeSolved:false, message: "no solution exists", solution: []}
            return data
    } else {
        console.log('input not safe. quit')
        const data = {canBeSolved:false, message: 'input not safe. quit', solution: []}
        return data
    }
}

// Driver Code
let grid = [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
[ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
[ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
[ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
[ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
[ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
[ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]

// if (solveSudoku(grid, 0, 0))
// print(grid)
// else
// document.write("no solution exists ")

// This code is contributed by rag2127

// </script>
