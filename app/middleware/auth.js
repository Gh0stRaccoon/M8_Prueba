const { verify } = require("jsonwebtoken");
const { auth } = require("../config");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const isValid = verify(token, auth.secret);
    if (isValid) {
      next();
    }
  } catch (error) {
    console.log("Unauthorized token", error);
    res.status(403).json({ message: "Unauthorized token." });
  }
};
