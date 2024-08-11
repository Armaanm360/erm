import { Router } from 'express';
import ProjectManagementRouter from './pm/pm.router';

class AdminRouter {
  public router = Router();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // project management
    this.router.use('/pm', new ProjectManagementRouter().router);
  }
}

export default AdminRouter;
