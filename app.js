const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const resetButton = document.querySelector('#reset-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submission = []

// tile pattern for squares
tiles = [1,1,1,0,0,0,1,1,1,
         1,1,1,0,0,0,1,1,1,
         1,1,1,0,0,0,1,1,1,
         0,0,0,1,1,1,0,0,0,
         0,0,0,1,1,1,0,0,0,
         0,0,0,1,1,1,0,0,0,
         1,1,1,0,0,0,1,1,1,
         1,1,1,0,0,0,1,1,1,
         1,1,1,0,0,0,1,1,1,
        ]

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
   
    if(tiles[i] == 1) inputElement.classList.add('odd-section')
       
    puzzleBoard.appendChild(inputElement)
}

const reset = () => {
    solveButton.disabled = false
    resetButton.style.display = "none"
    solveButton.style.display = "block"
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input)=>{
        input.value = ''
    })  
    submission.length = 0
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input,i) => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
}

const populateValues = (isSolvable, message, solution) => {
    const inputs = document.querySelectorAll('input')
    if( isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = 'This is the answer'
    } else {
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}

// solve via local file solver.js
const solve_local = () => {
    joinValues()
    const data = submission.join('')
    // console.log('data', data)

    // this will be made into a call to API via axios with data
    const response = solverSudokuWrapper(data)
    if(!response.canBeSolved) {
        solutionDisplay.innerHTML = 'This is not solvable'
    } else {
        populateValues(response.canBeSolved, response.message, response.solution)
    }
    solveButton.disabled = true
    solveButton.style.display = "none"
    resetButton.style.display = "block"
}

// solve via rapidapi/heroku
const solve = () => {
    joinValues()
    const data = submission.join('')
    console.log(data)

    const options = {
      method: 'POST',
      url: 'https://sudoku-solver9.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        // 'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
        'X-RapidAPI-Host': 'sudoku-solver9.p.rapidapi.com',
        'X-RapidAPI-Key': 'aeec4369c2mshc3929494c12007ap195358jsn8e3d19d44e53'
      },
        data: {
            "data":data
        }
        ,
    //   data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}'
    };
   
    axios.request(options).then(function (response) {
        // console.log(response.data);
        // console.log(response.data.data.canBeSolved)
        // if(!response.data.data.canBeSolved) {
        //     solutionDisplay.innerHTML = 'This is not solvable'
        // } else {
        //     populateValues(response.data.data.canBeSolved, response.data.data.message, response.data.data.solution)
        // }
        console.log(response.data);
        console.log(response.data.canBeSolved)
        if(!response.data.canBeSolved) {
            solutionDisplay.innerHTML = 'This is not solvable'
        } else {
            populateValues(response.data.canBeSolved, response.data.message, response.data.solution)
        }
        solveButton.disabled = true
        solveButton.style.display = "none"
        resetButton.style.display = "block"
    }).catch(function (error) {
        console.error(error);
    });
}



solveButton.addEventListener('click', solve)
resetButton.addEventListener('click', reset)
