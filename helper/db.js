const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true}); // Connect to the remote db
	mongoose.set('useCreateIndex', true); // Use create index same as T-SQL
    mongoose.connection.on('open', () => {
        console.log('Connection Succesful!');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Connection Error! ', err);
    });

    mongoose.Promise = global.Promise;
};