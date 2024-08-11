import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controller';
import AdminUserService from '../services/admin.user.service';
import AdminUserValidator from '../utils/validators/admin.user.validator';

class AdminProjectController extends AbstractController {
  private adminUserService = new AdminUserService();
  private adminUserValidator = new AdminUserValidator();
  constructor() {
    super();
  }

  public getAllProjects = this.asyncWrapper.wrap(
    { querySchema: this.commonValidator.queryListLimitSkip },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.adminUserService.getAllProjects(req);

      res.status(code).json(data);
    }
  );
}

export default AdminProjectController;
