"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const common_service_1 = __importDefault(require("../commonService/common.service"));
class commonController extends abstract_controller_1.default {
    constructor() {
        super();
        this.commonService = new common_service_1.default();
    }
}
exports.default = commonController;
