"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../app/database");
const UserAdmin_model_1 = __importDefault(require("./UserAdminModel/UserAdmin.model"));
const commonModel_1 = __importDefault(require("./commonModel/commonModel"));
class Models {
    // common models
    commonModel(trx) {
        return new commonModel_1.default(trx || database_1.db);
    }
    // user admin model
    UserAdminModel(trx) {
        return new UserAdmin_model_1.default(trx || database_1.db);
    }
}
exports.default = Models;
