const User = require('../models/user.model');
require('body-parser');


exports.getAdmin = (req, res, next) => {
    res.render('admin/home');
}

exports.getUserByID = (req, res, next) => {
    const { InputUserID } = req.query;
    if(!InputUserID){
        console.log("it wasn't real yo: "  + InputUserID);
        console.log("body.query is: " + body.query); 
    }   
    User.findOne({where: {id: InputUserID} })
        .then(user=>{
            console.log("The user id is: " + InputUserID);
            console.log("The user is: " + user);
    }).catch(err => {
        console.log(err);
    })
}