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
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const empCommonEngage_service_1 = __importDefault(require("../service/empCommonEngage.service"));
class EmpCommonEngageController extends abstract_controller_1.default {
    constructor() {
        super();
        this.service = new empCommonEngage_service_1.default();
        // get all product
        this.getAllProduct = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.service.getAllProduct(req), { code } = _a, data = __rest(_a, ["code"]);
            res.status(code).json(data);
        }));
        // get all source
        this.getAllSource = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = yield this.service.getAllSource(req), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        // get all organization
        this.getAllOrganization = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _c = yield this.service.getAllOrganization(req), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        // get all country
        this.getAllCountry = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _d = yield this.service.getAllCountry(req), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
        // get all city
        this.getallCityByCountry = this.asyncWrapper.wrap({ paramSchema: this.commonValidator.singleParamValidator("id") }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _e = yield this.service.getallCityByCountry(req), { code } = _e, data = __rest(_e, ["code"]);
            res.status(code).json(data);
        }));
        // get all area by city
        this.getAllAreaByCity = this.asyncWrapper.wrap({ paramSchema: this.commonValidator.singleParamValidator("id") }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _f = yield this.service.getAllAreaByCity(req), { code } = _f, data = __rest(_f, ["code"]);
            res.status(code).json(data);
        }));
        // get all employee
        this.getAllEmployee = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _g = yield this.service.getAllEmployee(req), { code } = _g, data = __rest(_g, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = EmpCommonEngageController;
