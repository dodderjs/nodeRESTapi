module.exports = function(sequelize, DataTypes) {
	var wishlist = sequelize.define('wishlist', {
		notification: {
			type: DataTypes.INTEGER
		},

	}, {
		underscored: true,
		createdAt: 'added_at',
		updatedAt: false,
		classMethods: {
			associate: function(models) {
				models.movies.hasMany(wishlist, { 
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});
				models.users.hasMany(wishlist, { 
					onDelete: 'CASCADE',
					foreignKey: {
						allowNull: false
					}
				});

				wishlist.belongsTo(models.users);
				wishlist.belongsTo(models.movies);
			}
		}
	});

	return wishlist;
};