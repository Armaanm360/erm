"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upc_userCard_router_1 = __importDefault(require("./routers/upc.userCard.router"));
const upc_userOtherCard_router_1 = __importDefault(require("./routers/upc.userOtherCard.router"));
class UpcUserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        // card
        this.router.use("/card", new upc_userCard_router_1.default().router);
        // other card
        this.router.use("/other-card", new upc_userOtherCard_router_1.default().router);
    }
}
exports.default = UpcUserRouter;
