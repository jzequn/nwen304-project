// setup dotenv for environment variables 
require('dotenv').config();

// setup the server
const express = require('express');
const app = express();


//setup bodyParser for fetching input from users
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//serve the javascript and css file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))


//define the port that this app will be running on
const port = process.env.PORT || 3000;


//setup remote database 
const sequelize = require('./util/database');

sequelize
    .sync()
    .then(result => {
        // run the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`)
        })
    })
    .catch(err => {
        console.log(err)
    })