import AbstractRouter from '../../../abstract/abstract.router';
import AdminProjectController from '../controllers/admin.project.controller';

class AdminProjectRouter extends AbstractRouter {
  private AdminProjectController = new AdminProjectController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    //create employee
    this.router.route('/').get(this.AdminProjectController.getAllProjects);
  }
}

export default AdminProjectRouter;
