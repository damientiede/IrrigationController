const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//make sure the database is seeded
const seedAll = require('./server/seeders').seedAll;
seedAll();

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome hahaha'
}));

module.exports = app;
