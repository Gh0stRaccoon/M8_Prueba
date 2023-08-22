const userRouter = require("express").Router();
const {
  createUser,
  deleteUserById,
  updateUserById,
  findAll,
  findUserById,
  singin,
} = require("../controllers/user.controller");
const { verifySignUp } = require("../middleware");
const { auth } = require("../middleware/auth");

userRouter.post("/signup", verifySignUp, createUser);
userRouter.post("/singin", singin);
userRouter.get("/user", auth, findAll);
userRouter
  .route("/user/:userId")
  .get(auth, findUserById)
  .put(auth, updateUserById)
  .delete(auth, deleteUserById);

module.exports = userRouter;
