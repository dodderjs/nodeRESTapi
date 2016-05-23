module.exports = function(sequelize, DataTypes) {
	var movies_images = sequelize.define('movies_images', {
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
				movies_images.belongsTo(models.movies, {
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return movies_images;
};