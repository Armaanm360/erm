"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pm_router_1 = __importDefault(require("./pm/pm.router"));
class AdminRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        // project management
        this.router.use('/pm', new pm_router_1.default().router);
    }
}
exports.default = AdminRouter;
