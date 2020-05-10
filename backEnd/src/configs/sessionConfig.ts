import * as dotenv from 'dotenv'
dotenv.config()
import * as session from 'express-session'
import * as sessionStore from 'session-file-store'
const FileStore = sessionStore(session)

type SESSIONConfig = {
  secret: string
  [key: string]: any
}

const sessionConfig: SESSIONConfig = {
  secret: process.env.SESSION_SECRET!,
  resave: false, // 기존 세션이 존재하는 경우 다시 저장할 필요가 있는지를 확인
  saveUninitialized: false, // 초기화되지 않은 세션의 저장 방지
  store: new FileStore(),
  cookie: { secure: false },
}

export default sessionConfig
