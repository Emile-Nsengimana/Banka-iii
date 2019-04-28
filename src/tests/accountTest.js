// /* eslint-disable no-undef */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import dotenv from 'dotenv';
// import server from '../server';

// dotenv.config();
// chai.use(chaiHttp);
// chai.should();

// describe('Account tests', () => {
//   let accountNo;
//   // ========================================== CREATE ACCOUNT ========================
//   it('should create a bank account', (done) => {
//     const account = {
//       type: 'current',
//     };
//     chai.request(server)
//       .post(`/api/v2/transactions/${accountNo}/debit`)
//       .send(account)
//       .set('token', process.env.adminToken)
//       .end((err, res) => {
//         res.body.status.should.be.equal(201);
//         accountNo = res.body.data.accountNumber;
//       });
//     done();
//   });
// });
