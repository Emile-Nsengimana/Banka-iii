import con from './dbConnect';

console.log('Outsode');
class dropTables {
  static async dropAll() {
    try {
      const dropTable = 'drop table transaction; drop table bankaccount; drop table users;';
      await con.query('drop table transaction; drop table bankaccount; drop table users;');
      console.log(d);
    } catch (error) {
      console.log(error);
    }
  }
}
dropTables.dropAll();
console.log('After');

export default dropTables;
