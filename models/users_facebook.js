module.exports = function(sequelize, DataTypes) {
	var users_facebook = sequelize.define('users_facebook', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false
		},
		json: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				users_facebook.belongsTo(models.users);
			}
		}
	});

	return users_facebook;
};