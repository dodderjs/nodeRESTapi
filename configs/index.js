
var path = require('path');
var _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var defaults = {

	env: process.env.NODE_ENV,

	root: path.normalize(__dirname + '../..'),

	port: process.env.PORT || 3000,

	secret: {
		session: 'titok'
	},

	db: {
		read: {
		host: 'localhost',
		user: '',
		password: '',
		database: '',
		connectionLimit : 100
		},

		write: {
			host: 'localhost',
			user: '',
			password: '',
			database: '',
			connectionLimit : 100
		}
	},

	auth: {
		google: {
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
	},

	collector: {
		omdb: {
			url: 'http://omdbapi.com',
			key: '',
			posterurl: 'http://ia.media-imdb.com/images/',
			limit: 10
		},
		trakt: {
			url: 'http://api.staging.trakt.tv',
			clientid: '',
			clientsecret: '',
			posterurl: 'https://image.tmdb.org/t/p/original/',
			limit: 10
		},

		tmdb: {
			url: 'http://api.themoviedb.org/3',
			key: '',
			posterurl: 'https://image.tmdb.org/t/p/original/',
			limit: 10
		},

		imdb: {
			url: 'http://www.imdb.com',
			key: '',
			posterurl: 'http://ia.media-imdb.com/images/',
			video: {
				videourl: 'http://www.imdb.com/video/imdb/%s',
				embedcode: '<iframe src="%s/imdb/embed?autoplay=false&width=480" width="480" height="270" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>'
			},
			limit: 10
		},

		ncore: {
			url : 'https://ncore.cc',
			rssUrlMovies: 'http://finderss.it.cx/?s=2015&cat=Film%20(ENG%20HD),Film%20(ENG%20DVD),Film%20(HUN%20HD),Film%20(HUN%20DVD),&d=1',
			rssUrlSeasons: 'http://finderss.it.cx/?&cat=Sorozat%20(HUN%20XviD),Sorozat%20(ENG%20DVD),Sorozat%20(HUN%20DVD),Sorozat%20(HUN%20HD),',
			loginurl : '/login.php',
			torrenturl : '/torrents.php',
			downloadparam : '?action=download&id=',
			detailsparam : '?action=details&id=',

			loginData: {
				nev: '',
				pass: '',
				set_lang: 'hu',
				submitted: '1',
				submit: 'Belépés!',
				ne_leptessen_ki: '1'
			},

			searchData: {
				nyit_filmek_resz: 'true',
				'kivalasztott_tipus[]': [ 'dvd_hun', 'dvd', 'hd_hun', 'hd' ],
				mire: '2015|2016',
				miben: 'name',
				tipus: 'kivalasztottak_kozott',
				tags: '',
				oldal: 1,
				miszerint: 'fid',
				hogyan: 'DESC'
			}
		}
	},

	image: {
		basePath: path.join(__dirname, '../public/posters') + '/',
		limit: 20
	},

	debug: {
		type: 'file',
		dirname: 'log',
		level: 'error'
	}
};
var env_configs = require('./' + process.env.NODE_ENV + '.js');

module.exports = _.merge(
	defaults,
	env_configs || {}
);