import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { Application } from 'express'
import morgan from 'morgan'
import hpp from 'hpp'
import cors from 'cors'
import helmet from 'helmet'
// import  session from 'express-session'
// import  sessionStore from 'session-file-store'
// const FileStore = sessionStore(session)
import passport from 'passport'
import passportConfig from './configs/passportConfig'
import { sequelize } from './models'
import routes from './api/routes'
import config from './configs'
import logger from './utils/logger'
import flash from 'connect-flash'

class App {
  private app: express.Application

  constructor() {
    this.app = express()
    ;(async () => {
      try {
        await this.start()
      } catch (error) {
        logger.error(error.message)
      }
    })()
  }

  /**
   * * 익스프레스 셋팅
   * TODO: 정적 파일 제공과 서비스
   * TODO: 템플릿 엔진 셋팅
   * TODO: 값 셋팅
   */
  private async setting({ expressApp }: { expressApp: Application }): Promise<void> {
    expressApp.set('port', config.port)
    // expressApp.static()
    // expressApp.engine() ...
  }

  /**
   * * 외부 모듈과 최상위 미들웨어 로더
   */
  private async loader({ expressApp }: { expressApp: Application }): Promise<void> {
    // await 붙여야 비동기가 멈춤
    try {
      await sequelize.sync({ force: false, alter: false })
    } catch (err) {
      throw err
    }

    expressApp.use(cors())
    expressApp.use(hpp())
    expressApp.use(helmet())
    expressApp.use(morgan('dev'))
    expressApp.use(express.json())
    expressApp.use(express.urlencoded({ extended: true }))
    // expressApp.use(
    //   session({
    //     secret: config.sessionSecret!,
    //     resave: false, // 기존 세션이 존재하는 경우 다시 저장할 필요가 있는지를 확인
    //     saveUninitialized: true, // 초기화되지 않은 세션의 저장 방지
    //     store: new FileStore(),
    //     cookie: { secure: false },
    //   })
    // )
    // expressApp.use(flash()) // 세션 사용할 때만 활성화
    expressApp.use(passport.initialize())
    // expressApp.use(passport.session()) // 내부적으로 세션을 사용
    passportConfig() // passport 전략 구성
  }

  /**
   * * 라우팅 설정
   */
  private async router({ expressApp }: { expressApp: Application }): Promise<void> {
    expressApp.use('/api', routes())
    expressApp.get('/favicon.ico', (req, res) => {
      res.status(204)
    })
    expressApp.use((req, res, next) => {
      let err = new Error('Not found')
      next(err)
    })
  }

  /**
   * * 포트 연결을 바인딤
   */
  private async listen({ expressApp }: { expressApp: Application }): Promise<void> {
    expressApp.listen(expressApp.get('port'), () => {
      logger.info(`App listening on the port ${expressApp.get('port')}`)
    })
  }

  /**
   * * 서버 시작
   */
  public async start(): Promise<void> {
    await this.setting({ expressApp: this.app })
    logger.info('setting completed')
    await this.loader({ expressApp: this.app })
    logger.info('load completed')
    await this.router({ expressApp: this.app })
    logger.info('routing completed')
    await this.listen({ expressApp: this.app })
  }
}

export default new App()
