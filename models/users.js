module.exports = function(sequelize, DataTypes) {
	var users = sequelize.define('users', {
		name: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			unique: 'email',
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		image: DataTypes.STRING,
		provider: DataTypes.STRING(50),
		level: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		},
		lastlogin: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		}
	}, {
		underscored: true,
		classMethods: {
			associate: function(models) {
				users.hasOne(models.users_google, { foreignKey: 'user_id' });
				users.hasOne(models.users_facebook, { foreignKey: 'user_id' });
			}
		}
	});

	return users;
};