 require('dotenv').config;

const express = require('express');
const methodOverride = require('method-override')
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const cookieParser = require('cookie-parser');
const userRoutes = require("./server/routes/userRoutes")
const todoRoutes = require("./server/routes/todoRoutes")
const { checkUser } = require('./server/middleware/validateToken');


const app = express();
const port = process.env.PORT || 5000

// Connect to Database
connectDB();

// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());


// static files
app.use(express.static('public'));

app.use(expressLayout);

app.set('view engine', 'ejs');
//express layouts
app.set('layout', './layouts/main');
app.set('userLayout', './layouts/userLayout');



//authentication middleware for all GET routes
app.get('*', checkUser)

// middleware before route handler 
app.use('/', userRoutes);
app.use('/api/todo', todoRoutes);

//general error handler
app.get('*', (req, res) => {
    res.status(404).render('404')
});

app.listen(port, () => console.log(`app listening on port: ${port}`));