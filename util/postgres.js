//const Sequelize = require('sequelize')


// heroku postgresql connect to nodejs app 
// don't forget to setup environment variabls with dotenv in the nodejs app 
// process.env.DATABASE_URL


// Antony's work on using without Sequelize
const{Pool, Client} = require('pg')
const connectionString = "postgres://fxnaccwfwmhrvr:c896d777af39a82546f0520986908945d1376a8bb506a7ec3f00b015ac16caaf@ec2-54-235-92-244.compute-1.amazonaws.com:5432/dej52ufjgas7g6"

const pool = new Client({    
    connectionString:connectionString,
    ssl: true,
})
pool.connect()

module.exports = pool