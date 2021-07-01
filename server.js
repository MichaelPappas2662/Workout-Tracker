const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let db = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workouttrackerDB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

// routes
app.use(router);
require("./routes/html")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = db;