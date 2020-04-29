import { Sequelize } from "sequelize";
import configs from "../configs";

const env =
  (process.env.NODE_ENV as "production" | "test" | "development") ||
  "development";
const { database, username, password } = configs.dbConfig[env];
const sequelize = new Sequelize(
  database,
  username,
  password,
  configs.dbConfig[env]
);

// 순환 참조시 두 모듈 중 하나가 빈 객체로 처리되어 문제가 발생
export { sequelize };
export default sequelize;
