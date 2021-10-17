const { json } = require('express');
const express = require('express')
const app = express()
const {getShelters, newShelter, getUsers, newUser, updateStatus} = require("./db/DB.js");
const session = require('express-session')
const port = 3000
const bodyParser = require('body-parser');

app.use(express.json()) // for parsing application/json

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(
  {
    secret: 'pots erif',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }
));
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
  var args = req.body;
  console.log(args);
  await newShelter(
    args["name"],
    args["lat"],
    args["lon"],
    args["address"],
    args["capacity"],
    args["phone"]
  );
  res.redirect("/")
})


app.get('/api/user', async (req, res) => {
  var users = await getUsers();
  res.send(users);
})


app.post('/api/user', async (req, res) => {
  var args = req.body
  console.log(args);
  var user = await newUser(
    args["registration"][0],
    args["registration"][1],
    args["registration"][2],
    args["evacstatus"]
  )
  req.session.user = user;
  res.redirect("/userlist")
})

app.put("/api/user", async (req, res) => {
  var status = req.body.status;
  var id = req.session.user;
  if(id)
  {
    await updateStatus(id, status);
    res.send("Succesfully updated");
  }
  else
  {
    res.send("No ID provided");
  }
})


app.get('/api/session_id', async (req, res) => {
  var id = req.session.user;
  if(id)
  {
    res.send("" + id);
  }
  else
  {
    res.send("");
  }
})


app.listen(port, () => {
  console.log(`Hosting app listening at http://localhost:${port}`)
})