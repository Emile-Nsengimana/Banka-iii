import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table transaction; drop table bankaccount; drop table users;');
};
dropTables();

export default dropTables;
