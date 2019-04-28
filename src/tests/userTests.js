/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();


let adminToken;
let staffToken;
describe('User tests', () => {
  // ========================================== ADMIN SIGN IN ========================
  it('should be able to sign in admin', (done) => {
    const user = {
      email: 'admin@gmail.com',
      password: 'open',

    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        adminToken = res.body.data.token;
      });
    done();
  });
  // ========================================== STAFF SIGN IN ========================
  it('should be able to sign in staff', (done) => {
    const user = {
      email: 'staff@gmail.com',
      password: 'open',

    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        staffToken = res.body.data.token;
      });
    done();
  });
  // ========================================== CREATE STAFF ACCOUNT ========================
  it('should not be able to create staff account', (done) => {
    const userB = {
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
      .post('/api/v2/auth/staff/signup')
      .send(userB)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
  it('should not be able to create staff account', (done) => {
    const userA = {
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
      .post('/api/v2/auth/staff/signup')
      .send(userA)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
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
      email: 'admin@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user1)
      .end((err, res) => {
        res.body.status.should.be.equal(409);
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
