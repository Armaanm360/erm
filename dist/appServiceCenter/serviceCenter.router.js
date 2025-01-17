"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkIn_router_1 = __importDefault(require("./routers/checkIn.router"));
class ServiceCenterRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        // check router
        this.router.use("/check-in", new checkIn_router_1.default().router);
    }
}
exports.default = ServiceCenterRouter;
