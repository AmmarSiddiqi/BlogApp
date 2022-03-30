import express, { json } from "express";

import "./start/envConfig.js";

import "./start/db.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import articles from "./routes/articles.js";
import upload from "./routes/imageUpload.js";

const app = express();
app.use(json());

app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/articles", articles);
app.use("/api", upload);

const port = process.env.PORT || 3300;

app.listen(port, () => console.log(`Server started at PORT ${port}`));
