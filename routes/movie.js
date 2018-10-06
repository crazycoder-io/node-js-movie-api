"use strict";
/*---------------------------------------- Variable Definition ----------------------------------------*/
const express = require('express');
const router = express.Router();
const Movie = require('../models/model-movie');
/*---------------------------------------- Variable Definition ----------------------------------------*/

/*----------------------------------------- Control Structure -----------------------------------------*/
// Get all movies
router.get('/', (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        foreignField: '_id',
        localField: 'director_id',
        as: 'Director'
      }
    },
    {
      $unwind: '$Director'
    }
  ]);
  
  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Top 10 list
router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Movies detail
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((data) => {
    if (!data) next({message: 'The movie was not found!', code: 1001});
    
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// Movies update
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true /*Parameter used to display updated data*/});

  promise.then((data) => {
    if (!data) 
      next({message: 'The movie was not found!', code: 1001});
    
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// Movies update
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data) => {
    if (!data) 
      next({message: 'The movie was not found!', code: 1001});
    
    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });
});

// Movies save
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
  
  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Get Between/:start_year/:end_year 
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: {"$gte": parseInt(start_year) /* $gte: big or equals */, "$lte": parseInt(end_year) /* $lte: small or equals */}
  });

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

/*----------------------------------------- Control Structure -----------------------------------------*/

/*----------------------------------------- Exporting -----------------------------------------*/
module.exports = router;
/*----------------------------------------- Exporting -----------------------------------------*/