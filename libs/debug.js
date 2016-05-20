var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file');
var path = require('path');
var config = require('../configs').debug;
var _ = require('lodash');

var logPath = path.join(__dirname, '../' + config.dirname);
var transports = [new winston.transports.Console({
	level: 'debug',
	prettyPrint: true,
	colorize: true,
	silent: false,
})];

if (config.env === 'production') {
	transports = [		
		new DailyRotateFile({ 
			name: config.level + '-log',
			filename: path.join(logPath, config.level + '.log'),
			level: config.level,
			datePattern: '.yyyy-MM-dd'
		}),

		new DailyRotateFile({ 
			name: 'error-log',
			filename: path.join(logPath, 'error.log'),
			level: 'error',
			datePattern: '.yyyy-MM-dd',
			humanReadableUnhandledException: true,
			handleExceptions: true
		})
	];
}

var logger = new (winston.Logger)({
	transports: transports
});

//module.exports = logger.log.bind(logger);
module.exports = logger;