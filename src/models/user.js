const userTable = `
CREATE TABLE IF NOT EXISTS
 users (
        userId serial primary key,
        firstName varchar(30) NOT NULL,
        lastName varchar(25) NOT NULL,
        gender varchar(15),
        phoneNumber varchar(15),
        email varchar(30) UNIQUE,
        password varchar(100) NOT NULL,
        type varchar(10),
        isAdmin boolean DEFAULT false
    )`;
const addUser = `insert into users (
        userId,
        firstName,
        lastName,
        gender varchar(15),
        phoneNumber varchar(15),
        email,
        password,
        type,
        isAdmin
    )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
export default {
  userTable,
  addUser,
  removeUser,
  searchUser,
};
