# How to use

```
1. Download the project
2. run 'npm install'
3. create .env file in the root folder, save it with DATABASE_URL

4. run 'npm start' or 'npm run dev' to start the app
```

## Related research

[Sample of using passport w/ mult strategies](https://gist.github.com/joshbirk/1732068)

## cURL

```Text
    Endpoints test

    // post one game
    curl --data "title=test&price=55.55&description=test&num_in_stock=3" http://localhost:3000/api/game

    // delete
    curl -X DELETE http://localhost:3000/api/game/1


    //get one game by id
    curl http://localhost:3000/api/game/1


    curl -X PUT -d "title=test123&price=12&description=you win" http://localhost:3000/api/game/6
```
