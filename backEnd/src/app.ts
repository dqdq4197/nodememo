import * as express from "express";
import * as morgan from "morgan";
import * as hpp from "hpp";
import * as helmet from "helmet";
import routes from "./api/routes";

class App {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.loader();
    this.router();
    this.listen();
  }

  private router() {
    this.app.use("/api", routes());
    this.app.use((req, res, next) => {
      let err = new Error("Not found");
      next(err);
    });
  }
  private loader() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default new App(9000);
