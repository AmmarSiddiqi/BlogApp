import "./start/envConfig.js";
import express, { json } from "express";
import cors from "cors";

import "./start/db.js";
import routes from "./start/route.js";

import { logger } from "./start/logger.js";

const app = express();
app.use(cors());
app.use(json());

routes(app);

const port = process.env.PORT || 3300;
app.listen(port, () => logger.info(`Server started at PORT ${port}`));
