import * as express from "express";
import * as morgan from "morgan";
import * as hpp from "hpp";
import * as helmet from "helmet";
import routes from "./api/routes";
import config from "./configs";
import logger from "./utils/logger";

class App {
  private app: express.Application;

  constructor(port: number) {
    this.app = express();
    (async () => {
      try {
        await this.setting(); // 익스프레스 셋팅
        await this.loader(); // 모듈 로딩
        await this.router(); // 라우터 셋팅
        await this.listen(); // 서버 시작
      } catch (error) {
        logger.error(error.message);
      }
    })();
  }
  private async setting() {
    this.app.set("port", config.port);
  }

  private async loader() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async router() {
    this.app.use("/api", routes()); // 라우터 등록
    this.app.get("/favicon.ico", (req, res) => {
      // favicon.ico throw err 막기
      res.status(204);
    });
    this.app.use((req, res, next) => {
      let err = new Error("Not found");
      next(err);
    });
  }

  private async listen() {
    this.app.listen(this.app.get("port"), () => {
      logger.info(`App listening on the port ${this.app.get("port")}`);
    });
  }
}

export default new App(9000);
