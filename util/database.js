const Sequelize = require('sequelize')


// heroku postgresql connect to nodejs app 
// don't forget to setup environment variabls with dotenv in the nodejs app 
// process.env.DATABASE_URL



sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

module.exports = sequelize; 