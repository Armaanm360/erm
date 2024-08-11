"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const config_1 = __importDefault(require("../../config/config"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const constants_1 = require("../../utils/miscellaneous/constants");
class AdminAuthService extends abstract_service_1.default {
    //login service
    loginService({ email, password, device_token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminModel = this.Model.UserAdminModel();
            const checkUser = yield adminModel.getSingleAdmin({ email });
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
        });
    }
    // get profile
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                success: false,
                code: this.StatusCode.HTTP_NOT_FOUND,
                message: this.ResMsg.HTTP_NOT_FOUND,
            };
        });
    }
    // update profile
    updateProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.admin;
            const model = this.Model.UserAdminModel();
            const checkAdmin = yield model.getSingleAdmin({
                id,
            });
            if (!checkAdmin.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const files = req.files || [];
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
        });
    }
    // forget
    forgetService({ token, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenVerify = lib_1.default.verifyToken(token, config_1.default.JWT_SECRET_ADMIN);
            if (!tokenVerify) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                };
            }
            const { email: verifyEmail, type } = tokenVerify;
            if (email === verifyEmail && type === constants_1.OTP_TYPE_FORGET_ADMIN) {
                const hashPass = yield lib_1.default.hashPass(password);
                const adminModel = this.Model.UserAdminModel();
                // await adminModel.updateAdmin({ password: hashPass }, { email });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    message: this.ResMsg.HTTP_FULFILLED,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
        });
    }
}
exports.default = AdminAuthService;
