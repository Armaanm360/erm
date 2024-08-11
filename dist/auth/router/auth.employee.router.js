"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const authChecker_1 = __importDefault(require("../../common/middleware/authChecker/authChecker"));
const auth_validator_1 = __importDefault(require("../../common/validators/auth.validator"));
const auth_employee_controller_1 = __importDefault(require("../controller/auth.employee.controller"));
class EmployeeAuthRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.authValidator = new auth_validator_1.default();
        this.controller = new auth_employee_controller_1.default();
        this.authChecker = new authChecker_1.default();
        this.callRouter();
    }
    callRouter() {
        //login router
        this.router.route("/login").post(this.controller.login);
        // profile
        this.router
            .route("/profile")
            .get(this.authChecker.employeeAuthChecker, this.controller.getProfile)
            .patch(this.uploader.cloudUploadRaw(this.fileFolders.EMPLOYEE_FILES), this.authChecker.employeeAuthChecker, this.controller.updateProfile);
        // forget password
        this.router
            .route("/forget-password")
            .post(this.commonValidator.commonForgetPassInputValidation(), this.controller.forgetPassword);
        // change password
        this.router
            .route("/change-password")
            .post(this.authChecker.employeeAuthChecker, this.controller.changeEmployeePassword);
    }
}
exports.default = EmployeeAuthRouter;
