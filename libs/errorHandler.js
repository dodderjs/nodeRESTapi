var logger = require('./debug');

//we can make error notifications (e.g erbit)
module.exports = function (error, callback, message, data) {
	if (typeof message !== 'string') {
		data = message;
		message = '';
	}
	if (data) {
		logger.error(message + (message ? ' - ' : '') + 'Error message: %j \nData: %j', error, data);
	} else {
		logger.error(message + (message ? ' - ' : '') + 'Error message: %j', error);
	}
	return callback(error);
}