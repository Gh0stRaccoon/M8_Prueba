const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const db = require("../models");
const { auth } = require("../config");
const User = db.users;
const Bootcamp = db.bootcamps;

// Crear y Guardar Usuarios
exports.createUser = (req, res) => {
  const user = req.body;

  return User.create(user)
    .then((user) => {
      console.log(
        `>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`
      );
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(`>> Error al crear el usuario ${err}`);
      return res.status(400).json({ message: "Error al crear el usuario" });
    });
};

exports.singin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Fill every fields." });

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password))
      return res
        .status(404)
        .json({ message: "Usuario o contraseña incorrecta" });

    const payload = {
      userId: user.id,
      email: user.email,
    };
    const token = sign(payload, auth.secret, { expiresIn: "1h" });
    console.log(`Se ha iniciado la sesión del usuario ${user.email}`);
    res.status(200).json({ token });
  } catch (error) {
    console.log(`No se pudo iniciar la sesión`, error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// obtener los bootcamp de un usuario
exports.findUserById = (req, res) => {
  const userId = req.params.userId;
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba el usuario: ${err}`);
      return res
        .status(400)
        .json({ message: "Error mientras se encontraba el usuario" });
    });
};

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = (req, res) => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`);
      return res
        .status(400)
        .json({ message: "Error mientras se buscaban los usuarios" });
    });
};

// Actualizar usuarios
exports.updateUserById = (req, res) => {
  const { userId } = req.params;
  const user = req.body;
  return User.update(
    {
      ...user,
    },
    {
      where: {
        id: userId,
      },
      returning: true,
    }
  )
    .then((user) => {
      if (!user[1][0])
        return res.status(404).json({ message: "Usuario no encontrado" });
      console.log(
        `>> Se ha actualizado el usuario: ${JSON.stringify(
          user[1][0],
          null,
          4
        )}`
      );
      return res.status(200).json(user[1][0]);
    })
    .catch((err) => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
      return res
        .status(200)
        .json({ message: "Error mientras se actualizaba el usuario" });
    });
};

// Eliminar usuarios
exports.deleteUserById = (req, res) => {
  const { userId } = req.params;
  return User.destroy({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      console.log(
        `>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`
      );
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`);
      return res
        .status(200)
        .json({ message: "Error mientras se eliminaba el usuario" });
    });
};
