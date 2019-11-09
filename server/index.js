const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const sql = require('mysql');

//SETUP
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const PORT = 8080;

//ROUTES
const api = require('./routes/api');
const auth = require('./routes/auth');
app.use('/api', api);
app.use('/auth', auth);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});



app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`);
})