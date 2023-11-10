
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const dataDogsAPI = require("../utils/dataDogsAPI");
const dataDogsDB = require("../utils/dataDogsDB");
const { Op } = require("sequelize");

const API_URL = "https://api.thedogapi.com/v1/breeds";
const MIN_NAME_LENGTH = 2;

// Función para crear un nuevo perro | POST /dogs
const createDog = async (
  name,
  height,
  weight,
  maxWeight,
  life_span,
  temperament
) => {
  if (!name || !height || !weight || !maxWeight || !life_span || !temperament) {
    throw Error("Datos faltantes");
  }

  // Obtiene una imagen aleatoria de perro de la API externa
  const image = (await axios.get("https://dog.ceo/api/breeds/image/random"))
    .data.message;

  // Crea un nuevo perro en la base de datos
  const newDog = await Dog.create({
    name,
    height,
    weight,
    maxWeight,
    life_span,
    image,
  });

  // Elimina temperamentos duplicados y los asocia al nuevo perro en la base de datos
  temperament = [...new Set(temperament)];
  for (const temp of temperament) {
    const eachTemperament = await Temperament.findOne({
      where: { name: temp },
    });
    await newDog.addTemperament(eachTemperament);
  }

  return newDog;
};

// Función para obtener datos de un perro por ID, de una API externa o de la base de datos local | get /dogs/:idRaza
const getById = async (idDog, source) => {
  let dogById = [];

  if (source === "api") {
    // Obtiene datos del perro de la API externa por ID
    const dogData = (await axios.get(API_URL)).data.find(
      (dog) => dog.id == idDog
    );

    if (!dogData) {
      throw Error("ID no encontrado");
    }

    // Formatea los datos del perro de la API
    dogById.push(dogData);
    dogById = dataDogsAPI(dogById);

    return dogById;
  }

  // Obtiene datos del perro de la base de datos local por ID
  const dogData = await Dog.findOne({
    where: { id: idDog },
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  // Formatea los datos del perro de la base de datos
  dogById.push(dogData);
  dogById = dataDogsDB(dogById);

  return dogById;
};

// Función para obtener todos los perros, combinando datos de la base de datos local y de la API externa | get /dogs
const getAllDogs = async () => {
  // Obtiene todos los perros de la base de datos local
  const dbData = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  // Formatea los datos de los perros de la base de datos
  const dbDogs = dataDogsDB(dbData);

  // Obtiene datos de todos los perros de la API externa
  const apiData = (await axios.get(API_URL)).data;
  const apiDogs = dataDogsAPI(apiData);

  // Combina los datos de los perros de la base de datos y de la API externa
  return [...dbDogs, ...apiDogs];
};

// Función para buscar perros por nombre, combinando datos de la base de datos local y de la API externa | GET /dogs/name?="..."
const getDogByName = async (name) => {
  if (name.length < MIN_NAME_LENGTH) {
    throw Error("El nombre a buscar debería tener al menos 2 caracteres");
  }

  // Obtiene perros de la base de datos local por nombre
  const dbData = await Dog.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  // Formatea los datos de los perros de la base de datos
  const dbDogs = dataDogsDB(dbData);

  // Obtiene datos de todos los perros de la API externa
  const apiData = (await axios.get(API_URL)).data;
  let apiDogs = dataDogsAPI(apiData);

  // Filtra los perros de la API por nombre
  apiDogs = apiDogs.filter((dog) =>
    dog.name.toLowerCase().includes(name.toLowerCase())
  );

  // Combina los datos de los perros de la base de datos y de la API externa
  return [...dbDogs, ...apiDogs];
};

// Función para eliminar un perro de la base de datos local por ID
const deleteDogDB = async (idDog) => {
  // Encuentra y elimina el perro de la base de datos
  const dogToDelete = await Dog.findByPk(idDog);

  if (!dogToDelete) {
    throw Error("Perro no encontrado");
  }

  await Dog.destroy({
    where: { id: idDog },
  });

  return dogToDelete;
};

module.exports = { createDog, getById, getAllDogs, getDogByName, deleteDogDB };

// Este código proporciona funciones para interactuar con datos de perros, ya sea desde una API externa o desde una base de datos local. Permite crear, obtener por ID, obtener todos, buscar por nombre y eliminar perros. También realiza operaciones de formato de datos entre la API y la base de datos.
