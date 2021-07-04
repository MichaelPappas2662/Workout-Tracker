const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouttrackerDB", {
  useNewUrlParser: true,
  useFindAndModify: false
});