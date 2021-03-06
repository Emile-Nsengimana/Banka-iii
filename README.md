# Banka-iii [![Coverage Status](https://coveralls.io/repos/github/Emile-Nsengimana/Banka-iii/badge.svg?branch=develop)](https://coveralls.io/github/Emile-Nsengimana/Banka-iii?branch=develop) <a href="https://codeclimate.com/github/Emile-Nsengimana/Banka-iii/maintainability"><img src="https://api.codeclimate.com/v1/badges/bb9060dc875254e8146d/maintainability" /></a>  [![Build Status](https://travis-ci.com/Emile-Nsengimana/Banka-iii.svg?branch=develop)](https://travis-ci.com/Emile-Nsengimana/Banka-iii)
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals

### Requirements

- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development
## Documentation

##### Expected Features

1. User (client) can sign up.
2. User (client) can login.
3. User (client) can create an account.
4. User (client) can view account transaction history.
5. User (client) can view a specific account transaction.
6. Staff (cashier) can debit user (client) account.
7. Staff (cashier) can credit user (client) account.
8. Admin/staff can view all user accounts.
9. Admin/staff can view a specific user account.
10. Admin/staff can activate or deactivate an account.
11. Admin/staff can delete a specific user account.
12. Admin can create staff and admin user accounts.
### Dependencies

- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `NPM` - a package manager for the JavaScript programming language
### SETUP
First clone it to your machine:
```
https://github.com/Emile-Nsengimana/Banka.git
```
Open it using your favorite IDE
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules
```
npm install
```
To start the app
```
npm start
```
To run tests
```
npm test
```

### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- |
`/` | GET | introduction |
| `/api/v2/auth/signup` | POST | user signup |
| `/api/v2/auth/login` | POST | user login |
| `/api/v2/accounts` | POST | create account |
| `/api/v2/account/<accountNo>` | POST | activate or deactivate account |
| `/api/v2/accounts` | GET | display all bank accounts |
| `/api/v2/accounts/<accountNo>` | GET | display a specific account |
| `/api/v2/account/<accountNo>` | DELETE | delete an account |
| `/api/v2/transactions/<accountNo>/debit` | POST | debit a bank account |
| `/api/v2/transactions/<accountNo>/credit` | POST | credit a bank account |
| `/api/v2/accounts/:accountNo/transactions` | GET | display a specific account transaction history |
| `/api/v2/transactions/:transactionId` | GET | displau a specific transaction details |
| `/api/v2/transactions` | GET | list all transactions history |

### How can it be manually tested
- using [postman](https://www.getpostman.com/downloads/)

