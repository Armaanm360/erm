"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class MonthlyTargetValidator {
    constructor() {
        // monthly target validator
        this.CreateMonthlyTarget = joi_1.default.object({
            phone_call: joi_1.default.number().required(),
            employee_id: joi_1.default.number().required(),
            month: joi_1.default.date().iso().required(),
            visit: joi_1.default.number().required(),
            sale: joi_1.default.number().required(),
            sale_in_amount: joi_1.default.number().optional(),
        });
        // update monthly target
        this.updateMonthlyTarget = joi_1.default.object({
            phone_call: joi_1.default.number().optional(),
            employee_id: joi_1.default.number().optional(),
            month: joi_1.default.date().iso().optional(),
            visit: joi_1.default.number().optional(),
            sale: joi_1.default.number().optional(),
            sale_in_amount: joi_1.default.number().optional(),
        });
    }
}
exports.default = MonthlyTargetValidator;
