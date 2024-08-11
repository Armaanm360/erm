"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class AdminUserValidator {
    constructor() {
        //login validator
        this.createAdminValidator = joi_1.default.object({
            name: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            avatar: joi_1.default.string().optional(),
            role: joi_1.default.number().required(),
        });
        this.updateAdminValidator = joi_1.default.object({
            name: joi_1.default.string().optional(),
            phone: joi_1.default.string().optional(),
            email: joi_1.default.string().optional(),
            avatar: joi_1.default.string().optional(),
            role: joi_1.default.number().optional(),
        });
        this.updateOrganizationValidator = joi_1.default.object({
            name: joi_1.default.string().optional().label('Name'),
            website: joi_1.default.string().uri().optional().label('Website'),
            phone: joi_1.default.string()
                .pattern(/^[0-9]+$/)
                .optional()
                .label('Phone'),
            country_id: joi_1.default.number().integer().optional().label('Country ID'),
            city_id: joi_1.default.number().integer().optional().label('City ID'),
            address: joi_1.default.string().optional().label('Address'),
            postal_code: joi_1.default.string().optional().label('Postal Code'),
            email: joi_1.default.string().email().optional().label('Email'),
            leave_allowance: joi_1.default.number().optional(),
        });
        this.adminLoginValidator = joi_1.default.object({
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        this.adminProfileUpdateValidator = joi_1.default.object({
            name: joi_1.default.string().optional(),
            phone: joi_1.default.string().optional(),
            avater: joi_1.default.string().optional(),
            role: joi_1.default.number().optional(),
            employee_id: joi_1.default.number().optional(),
        });
        this.adminForgetPasswordValidator = joi_1.default.object({
            token: joi_1.default.string().required().messages({
                'any.required': 'Provide valid token',
                'string.base': 'Provide valid token',
            }),
            email: joi_1.default.string().required().messages({
                'any.required': 'Provide valid email',
                'string.base': 'Provide valid email',
            }),
            password: joi_1.default.string().min(8).required().messages({
                'any.required': 'Please provide a valid password',
                'string.min': 'Password length must be at least 8 characters',
                'string.base': 'Please provide a valid password',
            }),
        });
    }
}
exports.default = AdminUserValidator;
