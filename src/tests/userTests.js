/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import con from '../../dbConnect';
import createDatabase from '../../db';

chai.use(chaiHttp);
chai.should();

describe('User tests', () => {
  // ========================================== SIGNUP =========================
  it('should be able to signup', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'shema2@gmail.com',
      password: '@Jam7891qazxsw!',
      retype: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isAdmin');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup twice with the same email', (done) => {
    const user = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'shema@gmail.com',
      password: '@Jam7891qazxsw!',
      retype: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  // it('should not be able to signup without re-typing the password correctly', (done) => {
  //   const user = {
  //     firstName: 'James',
  //     lastName: 'Shema',
  //     gender: 'male',
  //     phoneNo: '0701234567',
  //     email: 'abc@gmail.com',
  //     password: '@Jam7891qazxsw!m',
  //     retype: '@Jam7891qazxsw!',
  //     type: 'client',
  //   };
  //   chai.request(server)
  //     .post('/api/v2/auth/signup')
  //     .send(user)
  //     .end((err, res) => {
  //       res.body.status.should.be.equal(400);
  //       res.body.should.be.an('object');
  //       res.body.error.should.be.a('string');
  //     });
  //   done();
  // });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup with a weak password', (done) => {
    const user = {
      id: 1,
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abc@gmail.com',
      password: 'qwerty',
      retype: 'qwerty',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to signup without providing all required info', (done) => {
    const user = {
      firstName: '',
      lastName: '',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abcd@gmail.com',
      password: '@Jam7891qazxsw@',
      retype: '@Jam7891qazxsw@',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ========================================== LOGIN ==========================
  it('should be able to login', (done) => {
    const user = {
      email: 'shema@gmail.com',
      password: '@Jam7891qazxsw!',
    };
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.id.should.be.a('number');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to login with wrong password', (done) => {
    const user = {
      email: 'shema@gmail.com',
      password: '123456789',
    };
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to login with unexisting email', (done) => {
    const user = {
      email: 'shemajames@gmail.com',
      password: '@Jam7891qazxsw!',
    };
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should not be able to login with invalid email', (done) => {
    const user = {
      email: 'emilegmail.com',
      password: '@Jam7891qazxsw!',
    };
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ------------------------------------------------------------------------------------------
  it('should display welcome message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.body.should.be.an('object');
      });
    done();
  });
});
