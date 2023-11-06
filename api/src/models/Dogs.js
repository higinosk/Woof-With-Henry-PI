const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dogs",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      height: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      lifespan: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
