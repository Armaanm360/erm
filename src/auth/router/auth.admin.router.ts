import AbstractRouter from '../../abstract/abstract.router';
import AdminAuthController from '../controller/auth.admin.controller';

class AdminAuthRouter extends AbstractRouter {
  private controller = new AdminAuthController();
  constructor() {
    super();
    this.callRouter();
  }
  private callRouter() {
    //login router
    this.router.route('/login').post(this.controller.login);
  }
}

export default AdminAuthRouter;
