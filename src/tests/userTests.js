/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();

describe('User tests', () => {
  // ========================================== SIGNUP =========================
  it('should be able to signup', (done) => {
    const user0 = {
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
      id: 1,
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
        res.body.status.should.be.equal(401);
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ========================================== LOGIN ==========================
});
