const express = require('express')
const app = express()
const port = 3000

console.log(__dirname + "pages/index.html");

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/pages/main.html",)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})