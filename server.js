// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  const d = req.params.date;
  let date;
  //value of d is null or undefined
  if (!d) {
    date = new Date();
  }
  //value of d is only contains letter or digit
  else if (!isNaN(d)) {
    date = new Date(parseInt(d));
  }
  else {
    date = new Date(d);
  }
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: date.toString() });
  }
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
});


// listen for requests :)
const port = process.env.PORT || 80;
app.listen(port, () => { console.log(`Server is running on.... http://localhost:${port}`) });