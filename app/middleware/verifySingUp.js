const db = require("../models");

const User = db.users;

exports.verifySignUp = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    next();
  } else {
    res.status(400).json({ message: "El correo ingresado ya existe" });
  }
};
