import mongoose from "mongoose";

mongoose
  .connect(`${process.env.db}`)
  .then(() => console.log("Connected with Database"))
  .catch((ex) => {
    console.log(ex);
  });
