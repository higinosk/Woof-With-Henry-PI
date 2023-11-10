const { deleteDogDB } = require("../controllers/dogsController");

const deleteDogIdHandler = async (req, res) => {
  try {
    const { idDog } = req.params;

    if (!idDog) {
      return res.status(400).json({ error: "Invalid dog ID provided" });
    }

    await deleteDogDB(idDog);

    return res.status(200).json({ message: "Dog deleted successfully" });
  } catch (error) {
    console.error("Error deleting dog:", error);

    const errorMessage = error.message || "Internal server error";
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = deleteDogIdHandler;
