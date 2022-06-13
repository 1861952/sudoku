const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/solve', (req,res) => {
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver9.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          // 'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
          'X-RapidAPI-Host': 'sudoku-solver9.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        },
          data: {
              "data": "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"
          }
          ,
      //   data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}'
      };
     
      axios.request(options).then(function (response) {
        //   console.log(response.data);
        //   res.json(response.data)
        //   console.log(response.data.data.canBeSolved)
        //   if(!response.data.data.canBeSolved) {
        //       solutionDisplay.innerHTML = 'This is not solvable'
        //   } else {
        //       populateValues(response.data.data.canBeSolved, response.data.data.message, response.data.data.solution)
        //   }
          // ----------
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
  
)

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))