require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const handlers = require("./middlewares/handlers.js");
const logger = require("morgan");
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
const httpStatusText = require("./utils/httpStatusText");

mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => {
    console.log("DB connected.");
  })
  .catch(console.log);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("*", handlers.notFoundHandler);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText,
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listenning...");
});
