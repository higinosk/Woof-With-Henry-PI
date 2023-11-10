const axios = require("axios");
const { Temperament } = require("../db");

// Función para obtener todos los temperamentos desde la API externa
const getAllTemperaments = async () => {
  try {
    // Extrae temperamentos únicos de los datos de la API
    const temperamentsData = (
      await axios.get("https://api.thedogapi.com/v1/breeds")
    ).data;

    // Extrae nombres de temperamentos de la base de datos
    const temperaments = [
      ...new Set(
        temperamentsData.flatMap((breed) => breed.temperament.split(", "))
      ),
    ];

    return temperaments;
  } catch (error) {
    throw Error("Error fetching temperaments from the API");
  }
};

// Función para obtener todos los temperamentos desde la base de datos local | x hardcodeo | GET /temperaments:
const getAllTemperamentsDB = async () => {
  try {
    // Obtiene todos los temperamentos de la base de datos local
    const temperamentsDB = await Temperament.findAll({ attributes: ["name"] });

    // Extrae nombres de temperamentos de la base de datos
    const temperaments = temperamentsDB.map((temp) => temp.name);

    return temperaments;
  } catch (error) {
    throw Error("Error fetching temperaments from the database");
  }
};

module.exports = { getAllTemperaments, getAllTemperamentsDB };
