const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "favicon")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// client -> server(req,res) -> rapidapi(response)

app.post("/solve", (req, res) => {
  const options = {
    method: "POST",
    url: "https://sudoku-solver9.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      // 'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
      "X-RapidAPI-Host": "sudoku-solver9.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
    data: {
      data: "2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3",
    },
    //   data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}'
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
