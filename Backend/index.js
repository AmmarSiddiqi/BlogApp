const express = require("express");
const mongoose = require("mongoose");

const signup = require("./routes/signup");
const login = require("./routes/login");

const app = express();
app.use(express.json());

app.use("/api/signup", signup);
app.use("/api/login", login);

mongoose
  .connect("mongodb://localhost/blogs")
  .then(() => console.log("Connected with Database"));

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`Server started at PORT ${port}`));
