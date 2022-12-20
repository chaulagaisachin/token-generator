const express = require('express');
const mysql = require('mysql2');
const app = express();
const crypto = require('crypto');
const cryptoFunc = require('./cryptoFunc.js');


require('dotenv').config();

// Middleware to track logs for incoming request
app.use((req, res, next) => {
    const now = new Date();
    const hostname = req.headers.host;
    const dateString = now.toLocaleString();
    console.log(`[${dateString}] ${req.method} request received at http://${hostname}${req.url}`);
    next();
  });

// MySQL connection credentials
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });

// MySQL Connection testing
connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });


app.get('/', function(request, response) {
    response.sendFile(__dirname +'/public/index.html');
})


app.get('/random', function(request, response){
    response.send(cryptoFunc.generateToken());
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
