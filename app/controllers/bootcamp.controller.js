const db = require("../models");
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  const bootcamp = req.body;
  Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description,
  })
    .then((bootcamp) => {
      console.log(
        `>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`
      );
      return res.status(201).json(bootcamp);
    })
    .catch((err) => {
      console.log(`>> Error al crear el bootcamp: ${err}`);
      return res
        .status(500)
        .json({ error: "Error al crear el bootcamp", stack: err.stack });
    });
};

// Agregar un Usuario al Bootcamp
exports.addUser = (req, res) => {
  const { idBootcamp: bootcampId, idUser: userId } = req.body;
  Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return res.status(404).json({ error: "No se encontró el bootcamp" });
      }
      return User.findByPk(userId).then((user) => {
        console.log(user);
        if (!user) {
          console.log("Usuario no encontrado!");
          return res.status(404).json({ error: "No se encontró el usuario" });
        }
        bootcamp.addUser(user);
        console.log("***************************");
        console.log(
          ` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`
        );
        console.log("***************************");
        return res.status(201).json(bootcamp);
      });
    })
    .catch((err) => {
      console.log(
        ">> Error mientras se estaba agregando Usuario al Bootcamp",
        err
      );
      return res.status(500).json({
        error: "Hubo un problema al agregar el usuario a un bootcamp",
      });
    });
};

// obtener los bootcamp por id
exports.findById = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  return Bootcamp.findByPk(+id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return res.status(200).json(bootcamp);
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
      return res
        .status(500)
        .json({ error: "Hubo un problema al encontrar el bootcamp" });
    });
};

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = (req, res) => {
  Bootcamp.findAll()
    .then((bootcamps) => {
      return res.status(200).json(bootcamps);
    })
    .catch((err) => {
      console.log(">> Error Buscando los Bootcamps: ", err);
      return res.status(500).json({ error: "Error encontrando los bootcamps" });
    });
};
