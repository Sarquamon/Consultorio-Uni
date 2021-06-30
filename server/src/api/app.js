const express = require("express");
const morgan = require("morgan");
const CORS = require("cors");
require("dotenv").config();
const conn = require("../config/sqlconn");

const app = express();

app.use(CORS()); // CORS
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

conn
  .authenticate()
  .then(() => console.log("👤 Succesful auth"))
  .catch((err) => console.log("❌ Error on db connection:", err));

conn
  .sync({ alter: true })
  .then(() => console.log("🔌 Successful db connection"))
  .catch((err) => console.log("❌ Error!", err));

// routes
const indexRoute = require("./routes/index");

app.use("/", indexRoute);

// Error handling
app.use((_req, _res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
