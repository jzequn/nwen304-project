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
            res.render('admin/search-results', 
            {
                user:user
            })
    }).catch(err => {
        console.log(err);
    })
}

exports.getEditPage = (req, res, next) => {
    const {username, userid, email} = req.query;
    User.findOne({where: {id:userid}}).then(user =>{
        res.render('admin/review-details', {
            user: user
        })
    })
    
}

exports.putNewDetails = (req, res, next) => {
    const {InputNewUserName, InputNewUserID, InputNewUserEmail, CurrentUserID} = req.query;    
    /*User.update(
        {username: InputNewUserName},
        {id: InputNewUserID},
        {email: InputNewUserEmail},
        {where: {id: CurrentUserID}}
      )
      .then(
        User.findOne({where: {id: InputNewUserID} 
        }).then(user => {
            res.render('admin/review-details',{
                user: user
            })
        })
      .catch(next)
     })*/

     
     User.update(
        {username: InputNewUserName,
        id: 3/*InputNewUserID*/,
        email: InputNewUserEmail},
        {where: {id: CurrentUserID}}
      )
      User.findOne({where: {id: 3/*InputNewUserID*/} 
      }).then(user => {
          res.render('admin/review-details',{
              user: user
          })
      }).catch(next)
     

}
