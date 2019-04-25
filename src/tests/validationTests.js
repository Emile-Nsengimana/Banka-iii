/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

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

  // -------------------------------------------------------------------------------
});
