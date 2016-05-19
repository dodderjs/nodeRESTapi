var connection = require('../libs/dbconnection');
var errorHandler = require('../libs/errorHandler');

function create (data, done) {
	if (!data.provider) {
		return createBase(data, done);
	}

	createBase(data, function (err, result) {
		if (err) return errorHandler(err, done);

		connect(result.insertId, data, function (err, res) {
			if (err) {
				return remove(result.insertId, function (error) {
					done(err, res);
				});
			}
			done(err, result.insertId);
		});
	});
}

function createBase (data, done) {
	var query = 'INSERT IGNORE INTO users (??) VALUES (?)';

	connection.write(query, 
		[
			['name', 'email', 'image', 'provider'],
			[ data.name, data.email, data.image, data.provider || null ]
		], done);
}

function connect (userid, data, done) {
	var query = 'INSERT IGNORE INTO users_' + data.provider + ' SET ?';

	connection.write(query, [{
		id: data.id,
		user_id: userid,
		token: data.token,
		json: JSON.stringify(data[data.provider])
	}], done);
}

function remove (id, done) {
	connection.write('DELETE FROM users WHERE id=?', id, done);
}

function findOne (data, callback) {
	var query = 'SELECT u.id, u.name, u.email FROM users as u';

	if (data.provider) {
		query +=  ' INNER JOIN users_' + data.provider + ' as t ON u.id = t.user_id WHERE t.id = ?';
	} else {
		query += ' WHERE id=?';
	}

	connection.read(query, data.id, function (err, results) {
		callback(err, results[0]);
	});
}

function lastlogin (id, callback) {
	var query = 
		'UPDATE users ' +
		'SET lastlogin = CURRENT_TIMESTAMP ' +
		'WHERE id = ?';

	connection.write(query, id, function (err, results) {
		if (err) return console.log(err);
		
		callback && callback(err, results[0]);
	});
}

module.exports = {
	create: create,
	findOne: findOne,
	remove: remove,
	lastlogin: lastlogin
}