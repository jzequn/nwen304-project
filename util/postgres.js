//const Sequelize = require('sequelize')


// heroku postgresql connect to nodejs app 
// don't forget to setup environment variabls with dotenv in the nodejs app 
// process.env.DATABASE_URL


// Antony's work on using without Sequelize
const{Pool, Client} = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Client({    
    connectionString:connectionString,
    ssl: true,
})
pool.connect()

module.exports = pool