import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { ILogin } from '../../common/types/commonTypes';
import config from '../../config/config';
import Lib from '../../utils/lib/lib';
import { OTP_TYPE_FORGET_ADMIN } from '../../utils/miscellaneous/constants';

class AdminAuthService extends AbstractServices {
  //login service
  public async loginService({ email, password, device_token }: ILogin) {
    const adminModel = this.Model.UserAdminModel();
    const checkUser = await adminModel.getSingleAdmin({ email });

    if (!checkUser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.LOGIN_SUCCESSFUL,
    };
  }
  // get profile
  public async getProfile(req: Request) {
    return {
      success: false,
      code: this.StatusCode.HTTP_NOT_FOUND,
      message: this.ResMsg.HTTP_NOT_FOUND,
    };
  }

  // update profile
  public async updateProfile(req: Request) {
    const { id } = req.admin;

    const model = this.Model.UserAdminModel();

    const checkAdmin = await model.getSingleAdmin({
      id,
    });

    if (!checkAdmin.length) {
      return {
        success: true,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const files = (req.files as Express.Multer.File[]) || [];

    if (files.length) {
      req.body[files[0].fieldname] = files[0].filename;
    }

    const { email } = checkAdmin[0];

    // await model.updateAdmin(req.body, { email });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: 'Profile updated successfully',
    };
  }

  // forget
  public async forgetService({
    token,
    email,
    password,
  }: {
    token: string;
    email: string;
    password: string;
  }) {
    const tokenVerify: any = Lib.verifyToken(token, config.JWT_SECRET_ADMIN);

    if (!tokenVerify) {
      return {
        success: false,
        code: this.StatusCode.HTTP_UNAUTHORIZED,
        message: this.ResMsg.HTTP_UNAUTHORIZED,
      };
    }

    const { email: verifyEmail, type } = tokenVerify;

    if (email === verifyEmail && type === OTP_TYPE_FORGET_ADMIN) {
      const hashPass = await Lib.hashPass(password);
      const adminModel = this.Model.UserAdminModel();
      // await adminModel.updateAdmin({ password: hashPass }, { email });

      return {
        success: true,
        code: this.StatusCode.HTTP_OK,
        message: this.ResMsg.HTTP_FULFILLED,
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }
  }
}

export default AdminAuthService;
