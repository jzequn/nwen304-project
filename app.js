require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
// passport is authentication middleware for nodejs.
const passport = require('passport')

// middleware variables
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// a way to store user data between http request 
const session = require('express-session')


// the flash is a special area of session used for storing messages
const flash = require('connect-flash')

const logger = require('morgan')



//set up engines 
app.set('view engine', 'ejs')
app.set('views', 'views')

// serve javascript files and css files
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// passport config
require('./util/passport')(passport)


// use middleware 
app.use(logger('dev'))
app.use(cookieParser())
// express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
// passport middleware
app.use(passport.initialize())
app.use(passport.session())
// connect flash 
app.use(flash())
//passport 
app.use(passport.initialize())
app.use(passport.session())
// Global constants
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
})



// routes
const indexRoute = require('./routes/index')
app.use(indexRoute);
const userRoute = require('./routes/user');
app.use(userRoute)




const port = process.env.PORT || 3000;

/*app.listen(port, () => {
  console.log(`App is running on port ${port}`)
});*/
// when using purse sql, uncomment in database
// pool = require('./util/database')  (Antony 19/10)



// Sequel code
// connect to heroku PostgreSQL, start listening the app on port
const sequelize = require('./util/database')
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`)
    });
  })
  .catch(err => {
    console.log(err)
  })
