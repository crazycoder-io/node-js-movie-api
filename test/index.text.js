"use strict";
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHTTP);

// We define the test we will write
describe('Node Server', () => {
    it('(GET /) return mainpage', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done(); // It means test finished
            });
    });
});