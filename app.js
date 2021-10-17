const { json } = require('express');
const express = require('express')
const app = express()
const {getShelters, newShelter, getUsers, newUser} = require("./db/DB.js");

const port = 3000

app.use(express.json()) // for parsing application/json
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/pages/map-page.html",)
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + "/pages/register.html")
})

app.get('/userlist', (req, res) => {
  res.sendFile(__dirname + "/pages/userlist.html")
})

app.get('/shelterlist', (req, res) => {
  res.sendFile(__dirname + "/pages/shelterlist.html")
})

app.get('/shelterreg', (req, res) => {
  res.sendFile(__dirname + "/pages/shelterreg.html")
})

app.get('/map-page', (req, res) => {
  res.sendFile(__dirname + "/pages/map-page.html")
})

//api urls
app.get('/api/shelters', async (req, res) => {
  var shelters = await getShelters();
  res.send(shelters);
})


app.post('/api/shelters', async (req, res) => {
  var args = req.body
  await newShelter(
    args["name"],
    args["lat"],
    args["lon"]
  )
  res.send(args);
})


app.get('/api/user', async (req, res) => {
  var users = await getUsers();
  res.send(users);
})


app.post('/api/user', async (req, res) => {
  var args = req.body
  var user = await newUser(
    args["firstName"],
    args["lastName"],
    args["username"],
    args["status"]
  )
  res.cookie("id", user);
  res.send(user);
})

app.get('/api/session_id', async (req, res) => {
  var id = req.cookies.id;
  if(id)
  {
    res.send(id);
  }
  else
  {
    res.send("");
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})