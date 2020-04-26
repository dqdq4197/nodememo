import * as dotenv from "dotenv";
const env = dotenv.config();
if (!env) throw new Error("⚠️ Couldn't find .env file ⚠️");

export default {
  port: process.env.PORT!,

  dbConfig: null,

  jwtSecret: process.env.JWT_SECRET as string,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
