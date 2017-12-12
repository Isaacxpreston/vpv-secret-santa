const express = require("express")
const app = express()
app.use(express.static(__dirname + "/dist"))

const people = require('./people')
const passwordLookup = require('./passwordLookup')
const createPairs = require('./createPairs')
const filterData = require('./filterData')

let pairs = createPairs(people())

app.get("/api", (req, res) => {
  res.send(filterData(pairs))
})

app.get("/api/reset", (req, res) => {
  pairs = createPairs(people())
  res.send(filterData(pairs))
})

app.get("/api/password/:password", (req, res) => {
  res.send(passwordLookup(req.params.password, pairs))
})

app.get("*", (req, res) => {
  res.end()
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log("Listening on " + port)
})