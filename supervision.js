const express = require('express');
const ejs = require('ejs');
const path = require('path');

const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const initializeMongoServer = require('./configuration/db');

const app = express();
const port = 3004;

initializeMongoServer();


//set view
app.use(expressLayouts);
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//set public directory
app.use('/public',express.static('public'));

//user parser
app.use(bodyParser.urlencoded({ extended: true }));


//import router
const defaultRouter = require('./routes/default')
app.use('', defaultRouter);
app.listen(port, console.log(`Listning on Port: ${port}`));