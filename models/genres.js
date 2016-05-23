module.exports = function(sequelize, DataTypes) {
	var genres = sequelize.define('genres', {
		genre: {
			type: DataTypes.STRING(80),
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		classMethods: {
			associate: function(models) {
				genres.belongsToMany(models.movies, 
					{ as: 'Actor', 
					  through: 'movies_genres', 
					  foreignKey: 'genre_id',
					  timestamps: false
				});
				models.movies.belongsToMany(genres, 
					{ as: 'Movie', 
					  through: 'movies_genres', 
					  foreignKey: 'movie_id',
					  timestamps: false
					});
			}
		}
	});

	return genres;
};