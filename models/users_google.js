module.exports = function(sequelize, DataTypes) {
	var users_google = sequelize.define('users_google', {
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
				users_google.belongsTo(models.users);
			}
		}
	});

	return users_google;
};