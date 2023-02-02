const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// for image to provide image for frontend
app.use("/images", express.static(process.cwd() + "/public/uploads"));

// DB Connect
require("./config/mongodb.config");

// Middleware
const routes = require("./routes/");

// static
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// CRUD => product Create ===> Logged in admin/seller user
// /product post request ===> Login check ===> User role admin/seller =====> Product Create
// /brand post request

// anything listens
// http://localhost:9005/api/v1/
app.use("/api/v1", routes);

// 404 request
app.use((req, res, next) => {
  next({ status: 404, msg: "Resource not found" });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.log("ErrorHandling: ", error);
  let status_code = error.status || 500;
  let msg = error.msg ?? error;

  res.status(status_code).json({
    result: null,
    status: false,
    msg: msg,
  });
});

app.listen(9005, "localhost", (err) => {
  if (!err) {
    console.log("Server is running on port: " + 9005);
    console.log("press CTRL+C to disconnect");
  }
});
