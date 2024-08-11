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
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class AdminUserService extends abstract_service_1.default {
    constructor() {
        super();
    }
    getAllAdmin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, limit, skip } = req.query;
            const { organization_id } = req.admin;
            const model = this.Model.UserAdminModel();
            const { data, total } = yield model.getAllAdmin(organization_id, {
                key: key,
                limit: limit,
                skip: skip,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data,
                total,
            };
        });
    }
}
exports.default = AdminUserService;
