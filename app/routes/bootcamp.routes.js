const bootcampRouter = require("express").Router();
const {
  findAll,
  addUser,
  createBootcamp,
  findById,
} = require("../controllers/bootcamp.controller");
const { auth } = require("../middleware/auth");

bootcampRouter.route("/bootcamp").get(findAll).post(createBootcamp);
bootcampRouter.get("/bootcamp/:id", auth, findById);

bootcampRouter.post("/bootcamp/adduser", auth, addUser);

module.exports = bootcampRouter;
