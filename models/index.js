var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../configs').db;

var sequelize = new Sequelize(config.database, config.user, config.password, {
					host: config.host,
					dialect: 'mysql',

					pool: {
						max: config.connectionLimit,
						min: 0,
						idle: 10000
					}
				});
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    console.log(file, file.startsWith('.'))
    return (!file.startsWith('_') && !file.startsWith('.') && file !== 'index.js');
  })
  .forEach(function(file) {
    console.log(file)
  	var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;