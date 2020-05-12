module.exports = function(sequelize, DataTypes) {
  var Destination = sequelize.define("Destination", {
    locationType: DataTypes.STRING,
    locationName: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  });
  return Destination;
};
