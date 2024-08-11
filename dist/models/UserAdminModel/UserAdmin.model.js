"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
class UserAdminModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    // get admin
    getSingleAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, id } = payload;
            return yield this.db('user_admin AS ua')
                .withSchema(this.CRM_SCHEMA)
                .select('ua.id', 'ua.email', 'ua.password', 'ua.name', 'ua.avatar', 'ua.role', 'ua.phone', 'ua.status', 'ua.device_token', 'ua.created_at', 'ua.employee_id', 'ua.socket_id', 'e.name as employee_name', 'o.name as  org_name', 'o.id as organization_id', 'o.logo as logo', 'o.leave_allowance', 'o.address')
                // .joinRaw('JOIN crm.employee AS employee ON frd.forward_to = employee.id')
                .leftJoin('organization as o', 'o.id', '=', 'ua.organization_id')
                .leftJoin('employee as e', 'ua.employee_id', '=', 'e.id')
                .where(function () {
                if (email) {
                    this.andWhere('ua.email', email);
                }
                if (id) {
                    this.andWhere('ua.id', id);
                }
            });
        });
    }
}
exports.default = UserAdminModel;
