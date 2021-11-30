require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const port = config.get('port');
app.listen(port, () => { console.log(`Server is running on port....${port}`) });