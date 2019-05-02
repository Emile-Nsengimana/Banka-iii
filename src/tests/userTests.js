/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();
chai.use(chaiHttp);
chai.should();

let accountNum;

describe('User tests', () => {
  // ========================================== SIGNUP =========================
  it('should be able to signup', (done) => {
    const user0 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'shema100@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user0)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstname');
        res.body.data.should.have.property('lastname');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isadmin');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup twice with the same email', (done) => {
    const user1 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'shema@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup without re-typing the password correctly', (done) => {
    const user2 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abc@gmail.com',
      password: '@Jam7891qazxsw!m',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user2)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------

  it('should not be able to signup with a weak password', (done) => {
    const user3 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abc@gmail.com',
      password: 'qwerty',
      confirmPassword: 'qwerty',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user3)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup without providing all required info', (done) => {
    const user5 = {
      firstName: 'a',
      lastName: 'a',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abcd@gmail.com',
      password: '@Jam7891qazxsw@',
      confirmPassword: '@Jam7891qazxsw@',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user5)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });
});
describe('Account tests', () => {
  // ------------------------------------------- SIGN IN -------------------------
  it('shoult first sign in', (done) => {
    const userLogin = {
      email: 'staff@gmail.com',
      password: 'open',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(userLogin)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  // ------------------------------------------- CREATE AN ACCOUNT -------------------------
  it('should be able to create an account', (done) => {
    const account = {
      type: 'savings',
    };
    chai.request(server)
      .post('/api/v2/accounts/')
      .send(account)
      .set('token', process.env.staffToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        accountNum = req.body.data.accountNumber;
      });
    done();
  });

  // ------------------------------------------- CHANGE STATUS -------------------------
  it('should not be able to change account status', (done) => {
    const accountStatus = {
      status: 'active',
    };
    chai.request(server)
      .patch(`/api/v2/account/${accountNum}`)
      .send(accountStatus)
      .set('token', process.env.staffToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
  // ------------------------------------------- GET ACCOUNTS -------------------------
  it('should display all accounts', (done) => {
    chai.request(server)
      .get('/api/v2/accounts/')
      .set('token', process.env.adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.a('object');
      });
    done();
  });
});
