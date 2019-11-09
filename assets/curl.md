# curl test cases

Author: Zequn Jiang

## Resources

- games
- carts
- game_genres

## Endpoint for game table

All HTTP methods:

GET /api/games

```GET
curl http://nwen304-team-project.herokuapp.com/api/games
```

GET /api/game/:gameId

```GET
curl http://nwen304-team-project.herokuapp.com/api/game/1
```

POST /api/game

```POST
 curl --data "title=Call of Duty: Modern Warefare&price=50&description=Call of Duty: Modern Warfare is a first-person shooter video game developed by Infinity Ward and published by Activision&num_in_stock=3&genre=action-adventure&players=multiplayer&platform=PC" http://nwen304-team-project.herokuapp.com/api/game
```

DELETE /api/game/:gameId

```DELETE
curl -X DELETE http://nwen304-team-project.herokuapp.com/api/game/30
```

PUT /api/game/:gameId

```PUT
curl -X PUT -d "title=Call of Duty: Modern Warefare&price=50&description=Call of Duty: Modern Warfare is a first-person shooter video game developed by Infinity Ward and published by Activision&num_in_stock=3&genre=action-adventure&players=multiplayer&platform=PC" http://nwen304-team-project.herokuapp.com/api/game/25
```

## Endpoint for cart

All HTTP methods:

GET /api/carts

```GET
curl http://nwen304-team-project.herokuapp.com/api/carts
curl http://localhost:3000/api/carts
```

GET /api/cart/:cartId

```GET
curl http://nwen304-team-project.herokuapp.com/api/cart/1
curl http://localhost:3000/api/cart/1
```

POST /api/cart

```POST
curl --data "user_id=5" http://nwen304-team-project.herokuapp.com/api/cart
curl --data "user_id=5" http://localhost:3000/api/cart
```

DELETE /api/cart/:cartId

```DELETE
curl -X DELETE http://nwen304-team-project.herokuapp.com/api/cart/2
curl -X DELETE http://localhost:3000/api/cart/2
```

PUT /api/cart/:cartId

```PUT
curl -X PUT -d "user_id=3" http://nwen304-team-project.herokuapp.com/api/cart/2
curl -X PUT -d "user_id=3" http://localhost:3000/api/cart/2
```
