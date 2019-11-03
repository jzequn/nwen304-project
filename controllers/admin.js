const User = require('../models/user.model');
const Order = require('../models/order.model');
const Address = require('../models/address.model');
require('body-parser');

pool = require('../util/postgres');

exports.getAdmin = (req, res, next) => {
    res.render('admin/home');
}

exports.getUserByID = (req, res, next) => {
    const { InputUserID } = req.query;
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

exports.getOrderByID = (req, res, next) => {
    const { InputOrderID } = req.query;
    const queryText = 
    `SELECT
    u.username, 
    o.user_id,
    o.order_id, 
    o.order_date, 
    o.total_price, 
    a.address 
    FROM 
    orders AS o 
    JOIN address AS a 
    ON o.deliv_addr_id = a.address_id 
    JOIN users AS u 
    ON u.id = a.user_id
    WHERE o.order_id=` + InputOrderID;
    pool.query(queryText, (err, result) => {
        const pageMessage = 'Order of ' + result.rows[0].username;
        res.render('admin/review-orders', {
            orders: result.rows,
            message: pageMessage
        })
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

exports.getOrderEditPage = (req, res, next) => {
    const {username, userid, email} = req.query;    
    
    const queryText = 
    `SELECT 
    u.username, 
    o.user_id,
    o.order_id, 
    o.order_date, 
    o.total_price, 
    a.address  
    FROM orders AS o 
    JOIN address AS a 
    ON o.deliv_addr_id = a.address_id 
    JOIN users AS u 
    ON u.id = a.user_id`
    pool.query(queryText, (err, result) => {     
        const pageMessage = 'Looking at all past orders of ' + result.rows[0].username;   
        res.render('admin/review-orders', {
            orders: result.rows
        })
    })
    
    
    /*result.on('row', () => {
        orders.push(row);
    });
    result.on('end', () => {
        done();
        console.log(orders);
        res.render('admin/review-orders', {
            orders: orders
        })
    })*/


    /*Order.findAll({include: [{
        model: User,
        through: {
            attributes: ['id'],
            where: {user_id:userid}}
        }
        
    ]
    }).then(orders=>{
        console.log('This is orders!!!!!!!!!!!!!!!: '+orders);
        res.render('admin/review-orders', {
            orders: orders
        })
    })*/
}


exports.putNewDetails = (req, res, next) => {
    const {InputNewUserName, InputNewUserID, InputNewUserEmail, CurrentUserID} = req.body;    

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
     const updateText = "UPDATE users SET username = 'Antony Helsby', id=3, email='antonyhelsby@gmail.com' WHERE id=3"

     /*`UPDATE users SET username=` +  InputNewUserName + `, ` +
     `id=` + InputNewUserID + `, ` +
     `email=` + InputNewUserEmail +
     `WHERE id=` + CurrentUserID*/

     pool.query(updateText, (err, result) => {  
         if(err){
             return console.error('error in update', err)
         }           
    })

    const queryText = 'SELECT * FROM users WHERE id=' + InputNewUserID;
    pool.query(queryText, (err, result) => {
        if(err){
            return console.error('error in query', err)
        }              
        res.render('admin/review-details', {
            user: result.rows
        })        
    })
     
     /*User.update(
        {username: InputNewUserName,
        id: InputNewUserID,
        email: InputNewUserEmail},
        {where: {id: CurrentUserID}}
      );

      User.findOne({where: {id: InputNewUserID} 
      }).then(user => {
          res.render('admin/review-details',{
              user: user
          })
      });*/
          

}


