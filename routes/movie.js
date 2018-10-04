"use strict";
/*---------------------------------------- Variable Definition ----------------------------------------*/
const express = require('express');
const router = express.Router();
const Movie = require('../models/model-movie');
/*---------------------------------------- Variable Definition ----------------------------------------*/

/*----------------------------------------- Control Structure -----------------------------------------*/
router.post('/', (req, res, next) => {
  /* ----------------- You can use such -----------------
  const {title, category, country, year, imdb_score} = req.body;
  const movie = new Movie({
    title: title,
    category: category,
    country: country,
    year: year,
    imdb_score: imdb_score,
  });
  ----------------- You can use such ----------------- */

  // ----------------- or such -----------------
  const movie = new Movie(req.body);
  const promise = movie.save();
  
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
/*----------------------------------------- Control Structure -----------------------------------------*/

/*----------------------------------------- Exporting -----------------------------------------*/
module.exports = router;
/*----------------------------------------- Exporting -----------------------------------------*/