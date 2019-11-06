# curl test cases

## Resources

- games
- game_genres
- carts
- cartItems
- addresses

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

DELETE /api/delete/:gameId

```DELETE
curl -X DELETE http://nwen304-team-project.herokuapp.com/api/game/30
```

PUT /api/game/:gameId

```PUT
curl -X PUT -d "title=Call of Duty: Modern Warefare&price=50&description=Call of Duty: Modern Warfare is a first-person shooter video game developed by Infinity Ward and published by Activision&num_in_stock=3&genre=action-adventure&players=multiplayer&platform=PC" http://localhost:3000/api/game/25
```

## Endpoint for game_genres

```tejl

```
