"use strict";
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHTTP);
let token;

// We define the test we will write
describe('/api/movies test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ userName: 'crazycoder', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    
    describe('/GET movies', () => {
        it('It should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                });
            done(); // It means test finished
        });
    });
});