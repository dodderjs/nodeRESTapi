var config = require('../configs').db;
var mysql = require('mysql');
var errorHandler = require('./errorHandler');

var poolRead = mysql.createPool(config.read);
var poolWrite = mysql.createPool(config.write);

poolRead.on('error', errorHandler);
poolWrite.on('error', errorHandler);

function read (queryText, queryValues, done) {
	poolRead.getConnection(function (err, connection) {
		if (err) return errorHandler(err, done, 'MYSQL:getReadConnection');

		if (typeof queryValues === 'function') {
			done = queryValues;
			queryValues = null;
		}

		var sql = connection.query(queryText, queryValues, function (error, result) {
			if (error) errorHandler(error, null, 'MYSQL:read', sql.sql);

			done && done(error, result);
			connection.release();
		});
	});
}

function write (queryText, queryValues, done) {
	poolWrite.getConnection(function (err, connection) {
		if (err) return errorHandler(err, done, 'MYSQL:getWriteConnection');

		if (typeof queryValues === 'function') {
			done = queryValues;
			queryValues = null;
		}

		var sql = connection.query(queryText, queryValues, function (error, result) {
			if (error) errorHandler(error, done, 'MYSQL:write', sql.sql);

			done && done(error, result);
			connection.release();
		});		
	});
}

function end () {
	poolRead.end(function (err) {
		if (err) return errorHandler(err, null, 'MYSQL:end', 'Something horrible has happened');
	})
	poolWrite.end(function (err) {
		if (err) return errorHandler(err, null, 'MYSQL:end', 'Something horrible has happened');
	})
}

function escape (val) {
	return poolRead.escape(val);
}

//depricated
function createQuery (queryBase, queryExt, queryLimit, queryCols){
	return queryBase.replace('/*QUERY_EXTENSION*/', queryExt).replace('/*QUERY_LIMIT*/', queryLimit || '50').replace('/*QUERY_COLS*/', queryCols ? queryCols.join(', ') : '*');
};

module.exports = {
	read: read,
	write: write,
	createQuery: createQuery,
	end: end,
	escape: escape
}