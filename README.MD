[![Build status](https://travis-ci.org/crazycoder-io/node-js-movie-api.svg)](https://travis-ci.org/crazycoder-io/node-js-movie-api)

# NODEJS - Movie API

Restful API development project with Express and MongoDB. It works on [heroku server](https://nodejs-movieapi.herokuapp.com)

![nodejs](https://camo.githubusercontent.com/a58899969d8cd73c0e82619ca338965324cd9def/68747470733a2f2f6d65686d6574736576656e2e6e65742f636f6e74656e742f696d616765732f323031372f31322f6e6f64656a732d6d65686d65742d736576656e2e6a7067)

## What Is Needed To Run

Need a `.env` file in project root that is contain;
<br>
```
PORT=XXXX
DB_HOST=MongoDB-URI
SECRET_KEY=SECRET_KEY
```

# Movies

Route | HTTP Verb | POST body | Description
--- | --- | --- | ---
/api/movies/ | `GET` | Empty | List all movies.
/api/movies/ | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7, 'photo': 'url' } | Create a new movie.
/api/movies/:movie_id | `GET` | Empty | Get a movie
/api/movies/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a movie with new info.
/api/movies/:movie_id | `DELETE` | Empty | Delete a movie.
/api/movies/top10 | `GET` | Empty | Get the top 10 movies.
/api/movies/between/:start_year/:end_year | `GET` | Empty | Movies between two dates.

# Directors

Route | HTTP Verb | POST body | Description
--- | --- | --- | ---
/api/directors/ | `GET` | Empty | List all directors.
/api/directors/ | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director.
/api/directors/:director_id | `GET` | Empty | Get a director.
/api/directors//:director_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a director with new info.
/api/directors/:director_id | `DELETE` | Empty | Delete a director.
/api/directors/best10movie | `GET` | Empty | The director's top 10 films.

# Users

Route | HTTP Verb | POST body | Description
--- | --- | --- | ---
/register | `POST` | {username: 'foo', password: '1234'} | Create a new user.
/authentication | `POST` | {username: 'foo', password: '1234'} | Auth and get token.