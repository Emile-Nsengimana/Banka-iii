/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../server';
import jwt from '../helpers/tokenGenerator';

dotenv.config();
chai.use(chaiHttp);
chai.should();

const adminPayload = {
  userid: 1,
  email: 'admin@gmail.com',
  isadmin: true,
  type: 'staff',
};

const invalidPayload = {
  userid: 100,
  email: 'user@gmail.com',
  isadmin: true,
  type: 'staff',
};
const invalidToken = jwt.signToken(invalidPayload);
const adminToken = jwt.signToken(adminPayload);
let accountNo = 0;

describe('Account tests', () => {
  // ------------------------------------------- CREATE AN ACCOUNT -------------------------
  it('should be able to create an account', (done) => {
    const account = {
      type: 'savings',
    };
    chai.request(server)
      .post('/api/v2/accounts/')
      .send(account)
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        accountNo = res.body.data.accountNumber;
      });
    done();
  });

  it('should not create an account', (done) => {
    const account = {
      type: 'savings',
    };
    chai.request(server)
      .post('/api/v2/accounts/')
      .send(account)
      .set('token', invalidToken)
      .end((err, res) => {
        res.body.status.should.be.equal(500);
      });
    done();
  });

  // ------------------------------------------- CHANGE STATUS -------------------------
  it('should not be able to change account status', (done) => {
    const accountStatus = {
      status: 'active',
    };
    chai.request(server)
      .patch(`/api/v2/account/${accountNo}`)
      .send(accountStatus)
      .set('token', invalidToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });

  // ------------------------------------------- GET ACCOUNTS -------------------------
  it('should display all accounts', (done) => {
    chai.request(server)
      .get('/api/v2/accounts/')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.a('object');
      });
    done();
  });
});
