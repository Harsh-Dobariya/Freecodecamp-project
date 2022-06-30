// init project
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  const result = {
    ipaddress: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  }
  res.json(result);
});

const port = process.env.PORT || 80;
app.listen(port, () => { console.log(`Server is running on.... http://localhost:${port}`) });
