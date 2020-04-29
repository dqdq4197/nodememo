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
    (async () => {
      try {
        await this.loader(); // 모듈 로딩
        await this.router(); // 라우터 셋팅
        await this.listen(); // 서버 시작
      } catch (error) {
        console.error(error.message);
      }
    })();
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
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default new App(9000);
