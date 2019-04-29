/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();

let accountNbr;
describe('Validation tests', () => {
  // ========================================== SIGNUP =========================
  it('should require a gender', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      phoneNo: '0701234567',
      email: 'shema@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
  // ---------------------------------- PASSWORD COMPLEXITY ---------------------
  it('should require complex password', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      phoneNo: '0701234567',
      email: 'newuser@gmail.com',
      password: 'pass',
      confirmPassword: 'pass',
      type: 'client',
    };

    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });

  //  ------------------------------------------------------------------------------
  it('should create account', (done) => {
    const account = {
      type: 'savings',
    };

    chai.request(server)
      .post('/api/v2/accounts/')
      .send(account)
      .set('token', process.env.adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        accountNbr = res.body.data.accountNumber;
      });
    done();
  });
  //  ------------------------------------------------------------------------------
  it('should not be able to create account', (done) => {
    const account = {
      type: 'saving',
    };

    chai.request(server)
      .post('/api/v2/accounts/')
      .send(account)
      .set('token', process.env.adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
  //  ------------------------------------------------------------------------------
  it('should require status', (done) => {
    const account = {
      status: '',
    };

    chai.request(server)
      .patch(`/api/v2/account/${accountNbr}`)
      .send(account)
      .set('token', process.env.adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
  // -------------------------------------------------------------------------------
  it('should require email', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      email: '',
      phoneNo: '0701234567',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });

  // -------------------------------------------------------------------------------
  it('should not be able to signin without email', (done) => {
    const user = {
      email: '',
      password: '@Jam7891qazxsw!',
    };

    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
});
