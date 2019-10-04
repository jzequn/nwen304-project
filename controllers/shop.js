const path = require('path');

exports.getIndex = (req, res, next) => {
    // res.render('../Online_Shopping/index.html');
    // res.sendFile('../Online_Shopping/index.html');
    // res.sendFile(path.join(__dirname,'../Online_Shopping/index.html'))
    res.render('index');
}