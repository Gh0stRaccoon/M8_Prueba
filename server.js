const express = require("express");
const db = require("./app/models");
const routes = require("./app/routes/index.routes");

const app = express();
const port = 5000;

app.use(express.json());
app.use("/", routes);

app.listen(port, async () => {
  try {
    await db.sequelize.sync({
      force: true,
    });
    console.log("Eliminando y resincronizando la base de datos.");
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log("Error starting server", error);
  }
});
