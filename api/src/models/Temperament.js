const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Temperament", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false
  });
};
