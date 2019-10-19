const path = require('path');
const User = require('../models/user.model');

exports.getIndex = (req, res, next) => {
    // res.render('../Online_Shopping/index.html');
    // res.sendFile('../Online_Shopping/index.html');
    // res.sendFile(path.join(__dirname,'../Online_Shopping/index.html'))
    res.render('index');
}

exports.getSearch = (req, res, next) => {    
    console.log("MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body);
    const { search } = req.body;
    console.log(search);
    User.findOne({ where: { username: search } }).then(user => {
        console.log(user);
    })
    
}