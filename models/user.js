module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: { type: DataTypes.STRING, allowNull: false },
    homeTown: DataTypes.STRING,
    milesTraveled: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Destination, {
      onDelete: "cascade"
    });
  };
  return User;
};
