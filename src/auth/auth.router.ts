import { Router } from 'express';
import AdminAuthRouter from './router/auth.admin.router';

class AuthRouter {
  public AuthRouter = Router();

  constructor() {
    this.callRouter();
  }
  private callRouter() {
    this.AuthRouter.use('/admin', new AdminAuthRouter().router);
  }
}
export default AuthRouter;
