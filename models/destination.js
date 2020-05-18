module.exports = function(sequelize, DataTypes) {
  var Destination = sequelize.define("Destination", {
    departureCity: DataTypes.STRING,
    arrivalCity: DataTypes.STRING,
    tripDistance: DataTypes.INTEGER,
    tripBlog: DataTypes.TEXT
  });
  Destination.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Destination.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Destination.hasMany(models.Activity, {
      onDelete: "cascade"
    });
  };
  return Destination;
};
