module.exports = function(sequelize, DataTypes) {
	var movies = sequelize.define('movies', {
		imdb_id: {
			type: DataTypes.STRING(20),
			unique: true
		},
		tmdb_id: {
			type: DataTypes.INTEGER(20),
			unique: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imdb_rank: {
			type: DataTypes.FLOAT
		},
		release_date: {
			type: DataTypes.DATEONLY
		},
		release_year: {
			type: DataTypes.INTEGER(4)
		},
		poster: {
			type: DataTypes.STRING
		},
		plot: {
			type: DataTypes.STRING
		},
		pg: {
			type: DataTypes.STRING(10)
		},
		runtime: {
			type: DataTypes.INTEGER(10)
		}
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				movies.hasOne(models.movies_images, { foreignKey: 'movie_id' });
				movies.hasOne(models.movies_videos, { foreignKey: 'movie_id' });
			}
		}
	});

	return movies;
};