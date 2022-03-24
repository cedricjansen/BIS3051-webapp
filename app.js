// Externe Module
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Eigene Module
const Login = require('./controllers/loginController.js');
const database = require('./database/database.js');

// Starte Express App
var app = express();

// Session
var session = require('express-session');
const Database = require('./database/database.js');
app.use(session({
    name: 'session', // here is the name of the cookie. The default is connect.sid
    secret: 'Ssdsd@#e$#Rfe@#$d#$#', // 128 character random string is recommended
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

// Initialisiere eigene Objekte
var loginController = new Login();

// Setup der View Engine 
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Login call vom Frontend
app.post('/login', function(req, res) {
    loginController.login(req, res, 'home.html');
    var db = new Database();
    db.testConnection();
    db.end();
})

// Logout call vom Frontend
app.use('/logout', function(req, res) {
   loginController.logout(req, res, 'login.html');
});

// Verweise auf die Login Page beim Aufruf von /
// TODO Handling, wenn bereits eingeloggt.
app.use('/', function(req, res) {
    if(req.session.isFirst || req.cookies.isFirst) {
        // wenn bereits eingeloggt
        res.render('home.html');
    } else {
        // wenn nicht eingeloggt
        res.render('login.html');
    }      
});



module.exports = app;
