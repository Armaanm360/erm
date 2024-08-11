"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_user_router_1 = __importDefault(require("./routers/admin.user.router"));
class AdminRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        // employee
        this.router.use('/user', new admin_user_router_1.default().router);
    }
}
exports.default = AdminRouter;
