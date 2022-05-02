const express = require("express");
const path = require("path")
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const exp = require("constants");

//gets stuff for db connection
dotenv.config({path:'./.env'});

//used to start server with app
const app = express();

//database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//join to public dir to use styles
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));
app.use(cookieParser());

app.set('view engine', 'hbs');

//log errors
db.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
})
//prase url encoded bodies sent by html forms
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.listen(5001, () => {
    console.log("Server started on Port 5001")
})