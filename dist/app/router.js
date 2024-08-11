"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../auth/auth.router"));
const authChecker_1 = __importDefault(require("./../common/middleware/authChecker/authChecker"));
const admin_router_1 = __importDefault(require("../admin/admin.router"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.authRouter = new auth_router_1.default();
        this.authChecker = new authChecker_1.default();
        this.callV1Router();
    }
    callV1Router() {
        //auth router for member
        this.v1Router.use('/auth', this.authRouter.AuthRouter);
        // admin router
        this.v1Router.use('/admin', 
        // this.authChecker.adminAuthChecker,
        new admin_router_1.default().router);
    }
}
exports.default = RootRouter;
