import * as dotenv from "dotenv";
dotenv.config();

type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string | any;
};
interface IConfigGroup {
  development: DBConfig;
  production: DBConfig;
}
const dbConfig: IConfigGroup = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: "mysql",
    timezone: "+9:00",
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    dialect: "mysql",
    timezone: "+9:00",
  },
};

export default dbConfig;
