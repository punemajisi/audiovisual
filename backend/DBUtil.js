// Creator for DB
const Sequelize = require('sequelize');

// settings for DB
database = 'vdRecord'
username = 'root'
password = 'root' 
host = 'localhost' 

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Model: Record
class Record extends Sequelize.Model {}
Record.init({
  RecordID: {
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true
  },
  video_name: Sequelize.TEXT,
  actions: Sequelize.TEXT,
  indicator:Sequelize.TEXT,
  timestamp:Sequelize.TEXT,
  rand:Sequelize.TEXT,
}, { sequelize, modelName: 'Record' });


module.exports.sequelize = sequelize
module.exports.Record = Record