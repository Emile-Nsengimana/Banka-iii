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

const adminToken = jwt.signToken(adminPayload);

describe('User tests', () => {
  it('should display a summary of endpoints', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.body.should.be.a('object');
      });
    done();
  });

  // Signup test
  it('should be able to signup', (done) => {
    const user = {
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
      .send(user)
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

  it('should not be able to signup twice with the same email', (done) => {
    const user1 = {
      firstName: 'Emile',
      lastName: 'Nsengimana',
      gender: 'male',
      phoneNo: '0782057791',
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

  // User password test
  it('should not be able to signup without re-typing the password correctly', (done) => {
    const user2 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abc@gmail.com',
      password: '@Jam7891qazxsw!m',
      confirmPassword: 'aaaaaaaaaaaaaa',
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

  // Admin actions on user
  it('should be able to create a staff member', (done) => {
    const staff = {
      firstName: 'Staff',
      lastName: 'Member',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'staffmember@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'staff',
    };
    chai.request(server)
      .post('/api/v2/auth/staff/signup')
      .set('token', adminToken)
      .send(staff)
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


  it('should not be able to signup without re-typing the password correctly', (done) => {
    const user2 = {
      firstName: 'James',
      lastName: 'Shema',
      gender: 'male',
      phoneNo: '0701234567',
      email: 'abc@gmail.com',
      password: '@Jam7891qazxsw!m',
      confirmPassword: 'aaaaaaaaaaaaaa',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/staff/signup')
      .set('token', adminToken)
      .send(user2)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

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
      .post('/api/v2/auth/staff/signup')
      .set('token', adminToken)
      .send(user3)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

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
      .post('/api/v2/auth/staff/signup')
      .set('token', adminToken)
      .send(user5)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });

  it('should not be able to signup twice with the same email', (done) => {
    const user1 = {
      firstName: 'Emile',
      lastName: 'Nsengimana',
      gender: 'male',
      phoneNo: '0782057791',
      email: 'admin@gmail.com',
      password: '@Jam7891qazxsw!',
      confirmPassword: '@Jam7891qazxsw!',
      type: 'client',
    };
    chai.request(server)
      .post('/api/v2/auth/staff/signup')
      .set('token', adminToken)
      .send(user1)
      .end((err, res) => {
        res.body.status.should.be.equal(409);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  it('should signin a user', (done) => {
    const user1 = {
      email: 'admin@gmail.com',
      password: 'open',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('email');
      });
    done();
  });

  it('should not signin a user with incorrect password', (done) => {
    const user1 = {
      email: 'admin@gmail.com',
      password: 'open1',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });

  it('should not signin unexisting user ', (done) => {
    const user1 = {
      email: 'notexist@gmail.com',
      password: 'open',
    };
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user1)
      .end((err, res) => {
        res.status.should.be.equal(404);
        res.body.message.should.be.a('string');
      });
    done();
  });
});
