"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const admin_user_controllert_1 = __importDefault(require("../controllers/admin.user.controllert"));
class AdminUserRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.adminUserController = new admin_user_controllert_1.default();
        this.callRouter();
    }
    callRouter() {
        //create employee
        this.router.route('/').get(this.adminUserController.getAllAdmin);
    }
}
exports.default = AdminUserRouter;
