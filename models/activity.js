module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    activityName: { type: DataTypes.STRING, allowNull: false },
    activityDescription: DataTypes.STRING,
    activityType: DataTypes.STRING
  });
  Activity.associate = function(models) {
    // Associating Author with Po
    // When an Author is deleted, also delete any associated Posts

    Activity.belongsTo(models.Destination, {
      foreignKey: "arrivalCity"
    });
  };
  return Activity;
};
