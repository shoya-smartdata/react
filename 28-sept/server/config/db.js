

import Sequelize  from "sequelize";


const Connection  = new Sequelize('Task', 'root', 'smart@2099', {
    host: 'localhost',
    dialect: 'mysql'
  });

  Connection
  .authenticate()
  .then(() => {
    console.log('Connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default  Connection