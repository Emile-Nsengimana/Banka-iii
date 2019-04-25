/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import jwt from '../helpers/tokenGenerator';

chai.use(chaiHttp);
chai.should();

function toks() {
  const user = {
    id: 1,
    email: 'jack@gmail.com',
    isAdmin: true,
    type: 'staff',
  };
  const token = jwt.signToken(user.value);
  console.log(toks.token);
}
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

  // -------------------------------------------------------------------------------
  it('should require email', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
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

  // -------------------------------------------------------------------------------
  it('should require user type', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      email: 'this@gmail.com',
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

  // -------------------------------------------------------------------------------

  it('should require a gender', (done) => {
    const account = {
      status: 'clientm',
    };

    chai.request(server)
      .patch('/api/v2/account/12345')
      .send(account)
      .set(token, toks.token)
      .end((err, res) => {
        res.user.should.be.an('object');
        next();
      });
    done();
  });
});
