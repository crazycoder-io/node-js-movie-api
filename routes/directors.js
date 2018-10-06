"use strict";
/*---------------------------------------- Variable Definition ----------------------------------------*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Director = require('../models/model-directors');
/*---------------------------------------- Variable Definition ----------------------------------------*/

/*----------------------------------------- Control Structure -----------------------------------------*/
// Save directors
router.post('/', (req, res) => {
  const director = new Director(req.body); 
  const promise = director.save();

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Get all directors
router.get('/', (req, res) => {
  const promise = Director.find({});

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Top 10
router.get('/top10/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      } 
    },
    {
      $lookup: {
        from: 'movies',
        foreignField: 'director_id',
        localField: '_id',
        as: 'Movies'
      }
    },
    {
      $unwind: '$Movies'
    },
    {
      $limit: 5
    },
    {
      $sort: {
        imdb_score: -1
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname'
        },
        Movies:{
          $push: '$Movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        Movies: '$Movies'
      }
    }
  ]);

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })
});

// Top 5 films by directors
router.get('/top5', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        foreignField: 'director_id',
        localField: '_id',
        as: 'Movies'
      }
    },
    {
      $unwind:{ 
        path: '$Movies',
        preserveNullAndEmptyArrays: true /* Parameter used to display all records, With or without film */
      }
    },
    {
      $limit: 5
    },
    {
      $sort: {
        imdb_score: -1
      }
    },
    {
      $group: {
        _id: {
          id: '$id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        Movies:{
          $push: '$Movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        Movies: '$Movies'
      }
    }
  ]);

  promise.then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })
});

// Director detail
router.get('/:director_id', (req, res, next) => {
  const promise = Director.findById(req.params.director_id);

  promise.then(data => {
    if(!data) next({message: 'The director was not found!', code: 1001 });
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Director update
router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, { new: true /*Parameter used to display updated data*/ });

  promise.then(data => {
    if(!data) next({message: 'The director was not found!', code: 1001 });
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// Director delete
router.delete('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise.then(data => {
    if(!data) next({message: 'The director was not found!', code: 1001 });
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

/*----------------------------------------- Control Structure -----------------------------------------*/

/*----------------------------------------- Exporting -----------------------------------------*/
module.exports = router;
/*----------------------------------------- Exporting -----------------------------------------*/