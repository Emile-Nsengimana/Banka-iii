import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table transaction; drop table bankaccount; drop table users;')
    .then(async () => {

    })
    .catch((error) => {
      console.log('no tables fund');
    });
};
dropTables();

export default dropTables;
