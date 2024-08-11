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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class CRMMonthlyTargetService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create organization controller
    assignMonthlyTarget(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const _a = req.body, { employee_id, month } = _a, rest = __rest(_a, ["employee_id", "month"]);
                const { id, organization_id } = req.admin;
                req.body["organization_id"] = organization_id;
                const model = this.Model.crmSettingModel();
                const inputDate = new Date(month);
                const year = inputDate.getUTCFullYear();
                const months = inputDate.getUTCMonth();
                const startDate = new Date(Date.UTC(year, months, 1));
                const endDate = new Date(Date.UTC(year, months + 1, 0));
                const startDateStr = startDate.toISOString().split("T")[0];
                const endDateStr = endDate.toISOString().split("T")[0];
                const { data } = yield model.retrieveMonthlyTarget(organization_id, {
                    emp_id: req.body.employee_id,
                    from_date: startDateStr,
                    to_date: endDateStr,
                });
                if (data.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_CONFLICT,
                        message: "Already assigned monthly target for this month",
                    };
                }
                const newOrg = Object.assign(Object.assign({}, rest), { employee_id,
                    month,
                    organization_id, created_by: id });
                const result = yield model.assignMonthlyTarget(newOrg);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
    // get all monthly target
    retrieveMonthlyTarget(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { organization_id } = req.admin;
                const { limit, skip, month, searchPrm } = req.query;
                const model = this.Model.crmSettingModel();
                const { total, data } = yield model.retrieveMonthlyTarget(organization_id, {
                    limit: limit,
                    skip: skip,
                    month: month,
                    searchPrm: searchPrm,
                });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    total,
                    data,
                };
            }));
        });
    }
    // update monthly target
    updateMonthlyTarget(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const targetInfo = __rest(req.body, []);
                const { id } = req.params;
                const newOrg = Object.assign(Object.assign({}, targetInfo), { id });
                const model = this.Model.crmSettingModel();
                const result = yield model.updateMonthlyTarget(newOrg);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
    // delete monthly target
    deleteMonthlyTarget(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const model = this.Model.crmSettingModel();
                const result = yield model.deleteMonthlyTarget(id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
    // retrieve single target
    retrieveSingleMonthlyTarget(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const model = this.Model.crmSettingModel();
                const { data } = yield model.retrieveSingleMonthlyTarget(id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    data,
                };
            }));
        });
    }
}
exports.default = CRMMonthlyTargetService;
