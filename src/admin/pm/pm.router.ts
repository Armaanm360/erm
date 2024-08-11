import { Router } from 'express';

import AdminProjectRouter from './routers/admin.user.router';

class ProjectManagementRouter {
  public router = Router();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // employee
    this.router.use('/project', new AdminProjectRouter().router);
  }
}

export default ProjectManagementRouter;
