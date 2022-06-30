// init project
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

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

const port = process.env.PORT || 80;
app.listen(port, () => { console.log(`Server is running on.... http://localhost:${port}`) });
