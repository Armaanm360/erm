import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import ErrorHandler from '../common/middleware/errorHandler/errorHandler';
import CustomError from '../utils/lib/customEror';
import { origin } from '../utils/miscellaneous/constants';
import RootRouter from './router';

class App {
  public app: Application;
  private port: number;
  private origin: string[] = origin;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddleware();
    this.initRouters();
    this.notFoundRouter();
    this.errorHandle();
  }

  // start server
  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is started at port: ${this.port} 🚀`);
    });
  }

  // init middleware
  private initMiddleware() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: this.origin, credentials: true }));
  }

  // init routers
  private initRouters() {
    this.app.get('/', async (_req: Request, res: Response) => {
      res.send(`ERM server is running...🚀`);
    });
    this.app.use('/api/v1', new RootRouter().v1Router);
  }

  // not found router
  private notFoundRouter() {
    this.app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
      next(new CustomError('Cannot found the route', 404));
    });
  }

  //global error handler
  private errorHandle() {
    this.app.use(new ErrorHandler().handleErrors);
  }
}

export default App;
