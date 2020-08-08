import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import BurgerRouter from "./BurgersRouter";
import monk, { IMonkManager } from "monk";

const startServer = async () => {
  let db: IMonkManager;
  try {
    db = await monk("mongo:27017/burgers");
    console.log("Connected to burgers database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  const app = express();
  const apiRouter = express.Router();

  new BurgerRouter(apiRouter, db);

  app.use("/api", apiRouter);
  app.use(express.static("../ui/dist"));
  app.use(bodyParser.json());
  app.use(helmet());

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
      );
      res.header("Vary", "Accept-Encoding");
      next();
    }
  );

  app.listen(8080, function () {
    console.log("Burger server listening on port 8080...");
  });
};
startServer();
