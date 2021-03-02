"use strict";
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHTTP);
let token, director_id;

// We define the test we will write
describe('/api/directors tests', () => {
    // This method' s task bring token
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ userName: 'crazycoder', password: 'movieuser' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    // Test method of /GET directors
    describe('/GET directors', () => {
        it('It should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    // Test method of /POST directors
    describe('/POST directors', () => {
        it('It should POST a director', (done) => {
            const director = {
                name: 'TEST Director',
                surname: 'TEST',
                bio: 'TEST codes',
            };
            chai.request(server)
                .post('/api/directors')
                .set('x-access-token', token)
                .send(director)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    director_id = res.body._id;
                    done();
                });
        });
    });
    // Test method of /GET directors by the given id
    describe('/GET/:director_id directors', () => {
        it('It should GET a directors by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    res.body.should.have.property('_id').eql(director_id);
                    done();
                });
        });
    });
    // Test method of /PUT director by the given id
    describe('/PUT director', () => {
        it('It should UPDATE a director given by id', (done) => {
            const director = {
                name: 'TEST Director',
                surname: 'TEST Surname',
                bio: 'TEST codes',
            };
            chai.request(server)
                .put('/api/directors/' + director_id)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });
    // Test method of /DELETE director by the given id
    describe('/DELETE director', () => {
        it('It should DELETE a director given by id', (done) => {
            chai.request(server)
                .delete('/api/directors/' + director_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});