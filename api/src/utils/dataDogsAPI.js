const IMAGE_URL = "https://cdn2.thedogapi.com/images/";

// Función para formatear datos de perros desde una API
const dataDogsAPI = (dogData) => {
  return dogData.map((dog) => {
    //maneja el formato del peso de los perros en la API
    const weightMatches = dog.weight.metric.match(/(\d+)\s*(?:-\s*(\d+)\s*)?(?:kg)?/);
    let maxWeight = 0;
    if (weightMatches) maxWeight = parseInt(weightMatches[2] || weightMatches[1]);


    // Construye el objeto formateado
    return {
      id: dog.id,
      name: dog.name,
      height: `${dog.height.metric} cm`,
      weight: `${dog.weight.metric} kg`,
      maxWeight: maxWeight,
      lifeSpan: dog.life_span,
      image:
        (dog.id == 15 || dog.id == 125 || dog.id == 212)
          ? `${IMAGE_URL}${dog.reference_image_id}.png`
          : `${IMAGE_URL}${dog.reference_image_id}.jpg`,
      temperament: dog.temperament,
       // Establecido como falso ya que este atributo no es proporcionado por la API
      created: false,
    };
  });
};

module.exports = dataDogsAPI;

// Este código define una función llamada dataDogsAPI que formatea datos de perros provenientes de una API. Agrega un atributo de peso máximo, ajusta las unidades de altura y peso, genera URLs de imágenes según ciertos criterios y retorna un nuevo array de objetos de perros formateados.