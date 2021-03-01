const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_api:connect123@ds219983.mlab.com:19983/movie-api', {useMongoClient: true});
    mongoose.connection.on('open', () => {
        console.log('Connection Succesful!');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Connection Error! ', err);
    });

    mongoose.Promise = global.Promise;
};