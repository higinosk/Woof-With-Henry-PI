const { createDog } = require("../controllers/dogsController");

const postDogHandler = async (req, res) => {
  try {
    // Verificar se os campos obrigatórios estão presentes no corpo da requisição
    const { name, height, weight, maxWeight, life_span, temperament } = req.body;
    if (!name || !height || !weight || !maxWeight || !life_span || !temperament) {
      return res.status(400).json({ error: "Missing data. Make sure to provide all mandatory fields." });
    }

    // Chamar a função createDog do controller para criar o cachorro
    await createDog(name, height, weight, maxWeight, life_span, temperament);

    // Responder com sucesso
    return res.status(201).send("Dog created successfully");
  } catch (error) {
    // Tratar erros durante a criação do cachorro
    return res.status(500).json({ error: "Internal error while creating the dog." });
  }
};

module.exports = postDogHandler;

