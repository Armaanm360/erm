import { Router } from 'express';
import AuthRouter from '../auth/auth.router';
import AuthChecker from './../common/middleware/authChecker/authChecker';
import AdminRouter from '../admin/admin.router';

class RootRouter {
  public v1Router = Router();
  private authRouter = new AuthRouter();
  private authChecker = new AuthChecker();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    //auth router for member
    this.v1Router.use('/auth', this.authRouter.AuthRouter);

    // admin router
    this.v1Router.use(
      '/admin',
      // this.authChecker.adminAuthChecker,
      new AdminRouter().router
    );
  }
}

export default RootRouter;
