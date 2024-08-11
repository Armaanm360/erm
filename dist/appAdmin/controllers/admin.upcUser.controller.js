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
const admin_upcUser_service_1 = __importDefault(require("../services/admin.upcUser.service"));
const upc_common_validator_1 = __importDefault(require("../utils/validators/upc.common.validator"));
class AdminUpcUserController extends abstract_controller_1.default {
    constructor() {
        super();
        this.service = new admin_upcUser_service_1.default();
        this.validator = new upc_common_validator_1.default();
        //create user
        this.createUser = this.asyncWrapper.wrap({ bodySchema: this.validator.createUpcUserValidator }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.service.createUser(req), { code } = _a, data = __rest(_a, ["code"]);
            if (data.success) {
                res.status(code).json(data);
            }
            else {
                this.error(data.message, code);
            }
        }));
        //Get single user
        this.getSingleUser = this.asyncWrapper.wrap(null, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _b = yield this.service.getSingleUser(req), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        // update single user
        this.updateSingleUser = this.asyncWrapper.wrap({ bodySchema: this.validator.updateUpcUserValidator }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _c = yield this.service.updateSingleUser(req), { code } = _c, data = __rest(_c, ["code"]);
            if (data.success) {
                res.status(code).json(data);
            }
            else {
                this.error(data.message, code);
            }
        }));
        //Get single users card
        this.getSingleUsersCard = this.asyncWrapper.wrap({ paramSchema: this.commonValidator.singleParamValidator("user_id") }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _d = yield this.service.getSingleUsersCard(req), { code } = _d, data = __rest(_d, ["code"]);
            res.status(code).json(data);
        }));
        //get single card
        this.getSingleCardByUserAndCardId = this.asyncWrapper.wrap({
            paramSchema: this.commonValidator.doubleParamStringValidator("user_id", "card_id"),
        }, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const _e = yield this.service.getSingleCardByUserAndCardId(req), { code } = _e, data = __rest(_e, ["code"]);
            res.status(code).json(data);
        }));
    }
}
exports.default = AdminUpcUserController;