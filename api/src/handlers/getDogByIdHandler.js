const { getById } = require("../controllers/dogsController");

const getDogByIdHandler = async (req, res) => {
  try {
    const { idDog } = req.params;
    // Si el ID ingresado es UUID, trabajo con DB; sino, con API
    const source = isNaN(idDog) ? "db" : "api"; 
    const dog = await getById(idDog, source);
    return res.status(200).json(dog);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getDogByIdHandler;
