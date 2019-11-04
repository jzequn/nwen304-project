const Sequelize = require('sequelize')


// heroku postgresql connect to nodejs app 
// don't forget to setup environment variabls with dotenv in the nodejs app 
// process.env.DATABASE_URL



sequelize = new Sequelize("postgres://fxnaccwfwmhrvr:c896d777af39a82546f0520986908945d1376a8bb506a7ec3f00b015ac16caaf@ec2-54-235-92-244.compute-1.amazonaws.com:5432/dej52ufjgas7g6", {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

module.exports = sequelize; 