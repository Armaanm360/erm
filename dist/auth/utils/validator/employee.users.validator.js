"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class EmployeeValidator {
    constructor() {
        //login validator
        this.employeeLoginValidator = joi_1.default.object({
            email: joi_1.default.string().lowercase().required(),
            password: joi_1.default.string().required(),
        });
        this.employeeProfileUpdateValidator = joi_1.default.object({
            name: joi_1.default.string(),
            phone: joi_1.default.string(),
            designation: joi_1.default.string(),
            photo: joi_1.default.string(),
        });
        this.createOrUpdateEmployeeLocationValidator = joi_1.default.object({
            latitude: joi_1.default.number().min(-90).max(90).required(),
            longitude: joi_1.default.number().min(-180).max(180).optional(),
            timestamp: joi_1.default.date().iso().optional(),
            ip_address: joi_1.default.string().ip().optional(),
            device_id: joi_1.default.string().max(100).optional(),
            accuracy: joi_1.default.number().positive().optional(),
            location_type: joi_1.default.string().max(50).optional(),
            notes: joi_1.default.string().optional(),
        });
        this.employeeForgetPasswordValidator = joi_1.default.object({
            token: joi_1.default.string().required().messages({
                "any.required": "Provide valid token",
                "string.base": "Provide valid token",
            }),
            email: joi_1.default.string().required().messages({
                "any.required": "Provide valid email",
                "string.base": "Provide valid email",
            }),
            password: joi_1.default.string().min(8).required().messages({
                "any.required": "Please provide a valid password",
                "string.min": "Password length must be at least 8 characters",
                "string.base": "Please provide a valid password",
            }),
        });
    }
}
exports.default = EmployeeValidator;
