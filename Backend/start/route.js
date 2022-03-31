import signup from "../routes/signup.js";
import login from "../routes/login.js";
import articles from "../routes/articles.js";
import profile from "../routes/profiles.js";
import error from "../middleware/error.js";

const routes = (app) => {
  app.use("/api/signup", signup);
  app.use("/api/login", login);
  app.use("/api/articles", articles);
  app.use("/api/profile", profile);
  app.use(error);
};

export default routes;
