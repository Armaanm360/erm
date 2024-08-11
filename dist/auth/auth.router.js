"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_admin_router_1 = __importDefault(require("./router/auth.admin.router"));
class AuthRouter {
    constructor() {
        this.AuthRouter = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        this.AuthRouter.use('/admin', new auth_admin_router_1.default().router);
    }
}
exports.default = AuthRouter;