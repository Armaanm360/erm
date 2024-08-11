import { Request } from 'express';
import AbstractServices from '../../../abstract/abstract.service';

class AdminUserService extends AbstractServices {
  constructor() {
    super();
  }
  public async getAllProjects(req: Request) {
    console.log('Hello World');
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: 'Project Management',
    };
  }
}

export default AdminUserService;
