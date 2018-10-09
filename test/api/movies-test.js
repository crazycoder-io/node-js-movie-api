"use strict";
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHTTP);
let token, movie_id;

// We define the test we will write
describe('/api/movies tests', () => {
    // This method' s task bring token
    before((done) => {
        chai.request(server)
            .post('/authenticate/crazycoder/12345')
            .end((err, res) => {
                token = res.body.token;
                done(); // It means test finished
            });
    });
    // Test method of /GET movies
    describe('/GET movies', () => {
        it('It should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done(); // It means test finished
                });
        });
    });
    // Test method of /POST movies
    describe('/POST movies', () => {
        it('It should POST a movie', (done) => {
            const movie = {
                director_id: '5bba0104210f1219b7a6115b',
                title: 'TEST',
                category: 'Test codes',
                country: 'Turkey',
                year: 2000,
                imdb_score: 9
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movie_id = res.body._id;
                    done();
                });
        });
    });
    // Test method of /GET movies by the given id
    describe('/GET/:movie_id movie', () => {
        it('It should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                });
        });
    });
    // Test method of /PUT movie by the given id
    describe('/PUT movie', () => {
        it('It should UPDATE a movie given by id', (done) => {
            const movie = {
                director_id: '5bba0104210f1219b7a6115b',
                title: 'PUT TEST',
                category: 'Test codes for PUT',
                country: 'Turkey',
                year: 2000,
                imdb_score: 9
            };
            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });
    // Test method of /DELETE movie by the given id
    describe('/DELETE movie', () => {
        it('It should DELETE a movie given by id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});