// const puzzleBoard = document.querySelector('#puzzle')
// const solveButton = doucment.querySelector('#solve-button')
// // const solutionDisplay = document.querySelector('#solution')
// const squares = 81
// const submission = []

// for (let i = 0; i < squares; i++) {
//     const inputElement = document.createElement('input')
//     inputElement.setAttribute('type', 'number')
//     inputElement.setAttribute('min', 1)
//     inputElement.setAttribute('max', 9)
//     puzzleBoard.appendChild(inputElement)

// }

// const joinValues = () => {
//     const inputs = document.querySelectorAll('input')
//     inputs.forEach(input => {
//         if (input.value) {
//             submission.push(input.value)
//         } else {
//             submission.push('.')
//         }
//     })
//     console.log(submission)
// }

// const populateValues = (isSolvable, solution) => {
//     const inputs = document.querySelectorAll('input')
//     if (isSolvable && solution) {
//         inputs.forEach((input, i) => {
//             input.value = solution[i]
//         })
//     }
// }

// const solve = () => {
//     joinValues()
//     const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://sudoku-solver-redo.p.rapidapi.com/',
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '622fda2584msh989e26adad5c452p10da84jsn321a3478029a',
//     'X-RapidAPI-Host': 'sudoku-solver-redo.p.rapidapi.com'
//   },
//   data: {data: data}
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
//     populateValues(response.data.canBeSolved, response.data.solution)
// }).catch(function (error) {
// 	console.error(error);
// });
    
// }

// solveButton.addEventListener('click', solve)



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
    console.log('data',data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) .then(response => response.json())
       .then(data => console.log)
       .catch((error) => {
           console.error('Error:', error)
       })

}


solveButton.addEventListener('click', solve)
resetButton.addEventListener('click', reset)
