const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Temperaments",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      timestamp: false,
    }
  );
};
