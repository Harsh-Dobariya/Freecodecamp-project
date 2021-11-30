// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", (req, res) => {
  const result = {
    ipaddress: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  }
  res.json(result);
});



// listen for requests :)
const port = process.env.PORT || 80;
app.listen(port, () => { console.log(`Server is running on.... http://localhost:${port}`) });
