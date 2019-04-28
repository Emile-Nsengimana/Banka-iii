/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
chai.should();
let accountNu;
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
  //  ------------------------------------------------------------------------------
  // it('should require status', (done) => {
  //   const account = {
  //     status: '',
  //   };

  //   chai.request(server)
  //     .post(`/api/v2/account/${accountNu}`)
  //     .send(account)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
  //     .end((err, res) => {
  //       res.body.status.should.be.equal(400);
  //     });
  //   done();
  // });
  //  ------------------------------------------------------------------------------
  // it('should change account status', (done) => {
  //   const account = {
  //     status: 'draft',
  //   };

  //   chai.request(server)
  //     .post('/api/v2/account/accountNu')
  //     .send(account)
  //     .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGFmZkBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwidHlwZSI6InN0YWZmIiwiaWF0IjoxNTU2NDM4MTE0fQ.OpYSYFGXvzisKx7CVLQ2ALJRv6FqUxifez1-L9HvBZc')
  //     .end((err, res) => {
  //       res.body.status.should.be.equal(200);
  //     });
  //   done();
  // });
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
