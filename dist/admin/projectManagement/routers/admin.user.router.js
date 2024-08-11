"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../../abstract/abstract.router"));
const admin_project_controller_1 = __importDefault(require("../controllers/admin.project.controller"));
class AdminProjectRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.AdminProjectController = new admin_project_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //create employee
        this.router.route('/').get(this.AdminProjectController.getAllProjects);
    }
}
exports.default = AdminProjectRouter;
