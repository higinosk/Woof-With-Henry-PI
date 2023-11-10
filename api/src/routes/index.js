const { Router } = require("express");
const getDogs = require("../handlers/getDogsHandler");
const getDogById = require("../handlers/getDogByIdHandler");
const postDog = require("../handlers/postDogHandler");
const getTemperaments = require("../handlers/getTemperamentsHandler");
const deleteDogById = require("../handlers/deleteDogsHandler");

const router = Router();

router.get("/dogs", getDogs); //obtener por nombre o sino traer todo
router.get("/dogs/:idDog", getDogById);
router.post("/dogs", postDog);
router.get("/temperaments", getTemperaments);
router.delete("/dogs/:idDog", deleteDogById);

module.exports = router;
