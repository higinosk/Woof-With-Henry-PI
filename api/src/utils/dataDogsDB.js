const dataDogsDB = dogs => dogs.map(dog => ({
    id: dog.id,
    name: dog.name,
    height: `${dog.height} cm`,
    weight: `${dog.weight} kg`,
    maxWeight: dog.maxWeight,
    lifespan: `${dog.life_span} years`,
    image: dog.image,
    temperaments: dog.temperaments.map(({ name }) => name).join(', '),
    created: dog.created
}));

module.exports = dataDogsDB;

// Este código define una función llamada dataDogsDB que toma un array de objetos que representan perros y devuelve un nuevo array con los mismos perros, pero con ciertos campos formateados de manera diferente. La función agrega unidades a las medidas de altura y peso, renombra una propiedad, y transforma los temperamentos de los perros en una cadena de texto separada por comas.
