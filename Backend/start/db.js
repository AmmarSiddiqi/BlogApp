import mongoose from "mongoose";
console.log(process.env.db);
mongoose
  .connect(`${process.env.db}`)
  .then(() => console.log("Connected with Database"))
  .catch((ex) => {
    console.log(ex);
  });
