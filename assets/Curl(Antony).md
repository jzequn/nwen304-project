# Curl Test Cases
Author: Antony Helsby

### Note to team some of the ids could be invalid by sumbmission

## Resources

- order
- cart-item

## Order

 - GET/api/order</br>
 curl http://nwen304-team-project.herokuapp.com/api/order

 - GET /api/order/:orderID</br>
 curl http://nwen304-team-project.herokuapp.com/api/order/5
 
 - POST/api/order</br>
 curl --data "user_id=2&order_date=11/04/2019&total_price=99.99&deliv_addr=123 Machine Cres, Robotville, Metal Land" http://nwen304-team-project.herokuapp.com/api/order
 
 - DELETE /api/delete/:orderID</br>
 curl -X DELETE http://nwen304-team-project.herokuapp.com/api/order/5
 
 - PUT /api/order/:orderID</br>
 curl -X PUT -d "user_id=2&order_date=11/05/2019&total_price=99.99&deliv_addr=500 Axel Cres, Robotville, Metal Land" http://localhost:3000/api/order/6
 
 ## Cart-item
 
  - GET/api/cart-item</br>
curl http://nwen304-team-project.herokuapp.com/api/cart-item

 - GET /api/cart-item/:cart-itemID</br>
 curl http://nwen304-team-project.herokuapp.com/api/cart-item/1
 
 - POST/api/cart-item</br>
 curl --data "cart_id=1&game_id=1&quantity=5" http://nwen304-team-project.herokuapp.com/api/cart-item
 
 - DELETE /api/delete/:cart-itemID</br>
 curl -X DELETE http://nwen304-team-project.herokuapp.com/api/cart-item/5
 
 - PUT /api/cart-item/:cart-item</br>
 curl -X PUT -d "cart_id=1&game_id=1&quantity=3" http://localhost:3000/api/cart-item/6

 ## User
 
  - GET/api/user</br>
curl http://nwen304-team-project.herokuapp.com/api/user

 - GET /api/user/:userID</br>
 curl http://nwen304-team-project.herokuapp.com/api/user/1
 
 - POST/api/user</br>
 curl --data "username=Billy Bob&email=bb@gmail.com&password=password&fb_id=null&google_id=null" http://nwen304-team-project.herokuapp.com/api/user
 
 - DELETE /api/delete/:userID</br>
 curl -X DELETE http://nwen304-team-project.herokuapp.com/api/user/1
 
 - PUT /api/user/:user</br>
 curl -X PUT -d "username=Barbara Bob&email=barb@gmail.com&password=password&fb_id=null&google_id=null" http://localhost:3000/api/user/2
