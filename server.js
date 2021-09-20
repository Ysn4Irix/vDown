/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [App Entry Point]
 */

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const router = require("./routes/router");
const middlewares = require("./helpers/middlewares");

const app = express();

app.use(logger("common"));
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
