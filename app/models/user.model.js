const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "El Campo del nombre es requerido",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "El Campo del apellido es requerido",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "el correo electronico es requerido",
          },
          isEmail: {
            args: true,
            msg: "Formato de correo invalido",
          },
        },
        unique: {
          args: true,
          msg: "correo electronico actualmente registrado en la base de datos!",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: {
            args: [8, 25],
            msg: "La contraseña debe contener al menos 8 caracteres.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          const hashedPasswrod = await bcrypt.hash(user.password, 12);
          user.password = hashedPasswrod;
        },
      },
    }
  );

  return User;
};
