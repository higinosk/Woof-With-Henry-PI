const { getDogByName, getAllDogs } = require("../controllers/dogsController");

const getDogsHandler = async (req, res) => {
  try {
    const { name } = req.query;

    // Si tengo una consulta con nombre, busco y traigo el perro por nombre, sino traigo todos
    const results = name ? await getDogByName(name) : await getAllDogs();

    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
//http://localhost:3001/dogs?name=max
module.exports = getDogsHandler;
