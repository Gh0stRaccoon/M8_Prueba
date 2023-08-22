const router = require("express").Router();
const bootcampRouter = require("./bootcamp.routes");
const userRouter = require("./user.routes");

router.use("/api", bootcampRouter, userRouter);

module.exports = router;
