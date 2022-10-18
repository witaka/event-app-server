var assert = require('assert');

var supertest = require('supertest');

const { app } = require('./app');


const { connectDB} = require('./db');

describe('API test', () => {
  beforeAll(() => {
    connectDB();
  });

describe('TestAPI', () => {
    describe('Post entry to database',  () => {
        it('returns created registration on success',  (done) => {

            const validEntry = {
                "firstName":"Bob",
                "lastName":"Smith",
                "email": "12123@eamil.ca",
                "age":"25",
                "country":"us",
                "phoneNumber": "1214252525"
            
            };

            supertest(app)
                .post('/registrants')
                .send(validEntry)
                .expect(201)
                .end( (error, res) =>  {

                    if (error) {
                        return done(error);
                    }

                    assert.equal(res.body.firstName, validEntry.firstName);

                    assert.equal(res.body.lastName, validEntry.lastName);

                    assert.equal(res.body.email, validEntry.email);

                    done();

                });

        });

    });

});
});