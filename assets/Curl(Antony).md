# Curl Test Cases
Author: Antony Helsby

### Note to team some of the ids could be invalid by sumbmission

## Resources

- order
- cart-item

## Order

 - GET/api/order
curl http://nwen304-team-project.herokuapp.com/api/order

 - GET /api/order/:orderID
 curl http://nwen304-team-project.herokuapp.com/api/order/5
 
 - POST/api/order
 curl --data "user_id=2&order_date=11/04/2019&total_price=99.99&deliv_addr=123 Machine Cres, Robotville, Metal Land" http://nwen304-team-project.herokuapp.com/api/order
 
 - DELETE /api/delete/:orderID
 curl -X DELETE http://nwen304-team-project.herokuapp.com/api/order/5
 
 - PUT /api/orders/:orderID
 curl -X PUT -d "user_id=2&order_date=11/05/2019&total_price=99.99&deliv_addr=500 Axel Cres, Robotville, Metal Land" http://localhost:3000/api/order/6
 
 ## Cart-item
 
  - GET/api/cart-item
curl http://nwen304-team-project.herokuapp.com/api/cart-item

 - GET /api/cart-item/:cart-itemID
 curl http://nwen304-team-project.herokuapp.com/api/cart-item/1
 
 - POST/api/cart-item
 curl --data "cart_id=1&game_id=1&quantity=5" http://nwen304-team-project.herokuapp.com/api/cart-item
 
 - DELETE /api/delete/:cart-itemID
 curl -X DELETE http://nwen304-team-project.herokuapp.com/api/cart-item/5
 
 - PUT /api/orders/:cart-item
 curl -X PUT -d "cart_id=1&game_id=1&quantity=3" http://localhost:3000/api/cart-item/6
