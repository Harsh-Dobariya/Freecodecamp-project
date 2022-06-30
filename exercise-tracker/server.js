const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})