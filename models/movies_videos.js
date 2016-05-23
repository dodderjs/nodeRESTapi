module.exports = function(sequelize, DataTypes) {
	var movies_videos = sequelize.define('movies_videos', {
		id: {
			type: DataTypes.STRING(40),
			primaryKey: true
		},
		type: {
			type: DataTypes.STRING(20)
		}
	}, {
		timestamps: false,
		underscored: true,
		classMethods: {
			associate: function(models) {
				movies_videos.belongsTo(models.movies, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return movies_videos;
};