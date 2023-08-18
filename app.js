require('dotenv').config;

const express = require('express')
const methodOverride = require('method-override')
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');


const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride('_method'))

// static files
app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');


// Routes
app.use('/', require('./server/routes/todo'))

// Home
 
// handle error 404

app.get('*', (req, res) => {
    res.status(404).render('404');
});
app.listen(port, () => console.log(`app listening on port: ${port}`))