import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import { ILogin } from '../../common/types/commonTypes';
import AdminAuthService from '../services/auth.admin.service';
import CommonService from '../../common/commonService/common.service';
import AdminUserValidator from './../utils/validator/admin.users.validator';

class AdminAuthController extends AbstractController {
  private service = new AdminAuthService();
  private commonService = new CommonService();
  private adminUserValidator = new AdminUserValidator();
  constructor() {
    super();
  }

  // login
  public login = this.asyncWrapper.wrap(
    { bodySchema: this.adminUserValidator.adminLoginValidator },
    async (req: Request, res: Response) => {
      const { email, password } = req.body as ILogin;
      const { code, ...data } = await this.service.loginService({
        email,
        password,
        device_token: req.headers.device_token as string,
      });
      res.status(code).json(data);
    }
  );

  // get profile
  public getProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getProfile(req);
      res.status(code).json(data);
    }
  );

  // update profile
  public updateProfile = this.asyncWrapper.wrap(
    { bodySchema: this.adminUserValidator.adminProfileUpdateValidator },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.updateProfile(req);
      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );

  // forget password
  public forgetPassword = this.asyncWrapper.wrap(
    { bodySchema: this.adminUserValidator.adminForgetPasswordValidator },
    async (req: Request, res: Response) => {
      const { token, email, password } = req.body;
      const { code, ...data } = await this.service.forgetService({
        token,
        email,
        password,
      });
      res.status(code).json(data);
    }
  );

  // change password
  // public changeAdminPassword = this.asyncWrapper.wrap(
  //   { bodySchema: this.commonValidator.changePasswordValidator },
  //   async (req: Request, res: Response) => {
  //     const { old_password, new_password } = req.body;
  //     const { id } = req.admin;
  //     const table = "user_admin";
  //     const passField = "password";
  //     const userIdField = "id";
  //     const schema = "crm";

  //     const { code, ...data } = await this.commonService.userPasswordVerify({
  //       table,
  //       oldPassword: old_password,
  //       passField,
  //       userId: id,
  //       userIdField,
  //       schema,
  //     });
  //     if (data.success) {
  //       const { code, ...data } = await this.commonService.changePassword({
  //         password: new_password,
  //         table,
  //         passField,
  //         userId: id,
  //         userIdField,
  //         schema,
  //       });
  //       res.status(code).json(data);
  //     } else {
  //       res.status(code).json(data);
  //     }
  //   }
  // );
}

export default AdminAuthController;
