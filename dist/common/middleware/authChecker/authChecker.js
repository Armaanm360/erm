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
const config_1 = __importDefault(require("../../../config/config"));
const lib_1 = __importDefault(require("../../../utils/lib/lib"));
const responseMessage_1 = __importDefault(require("../../../utils/miscellaneous/responseMessage"));
const statusCode_1 = __importDefault(require("../../../utils/miscellaneous/statusCode"));
class AuthChecker {
    constructor() {
        // admin auth checker
        this.adminAuthChecker = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization) {
                return res
                    .status(statusCode_1.default.HTTP_UNAUTHORIZED)
                    .json({ success: false, message: responseMessage_1.default.HTTP_UNAUTHORIZED });
            }
            const authSplit = authorization.split(' ');
            if (authSplit.length !== 2) {
                return res.status(statusCode_1.default.HTTP_UNAUTHORIZED).json({
                    success: false,
                    message: responseMessage_1.default.HTTP_UNAUTHORIZED,
                });
            }
            const verify = lib_1.default.verifyToken(authSplit[1], config_1.default.JWT_SECRET_ADMIN);
            if (!verify) {
                return res
                    .status(statusCode_1.default.HTTP_UNAUTHORIZED)
                    .json({ success: false, message: responseMessage_1.default.HTTP_UNAUTHORIZED });
            }
            else {
                if (verify.type !== 'admin' || verify.status === 0) {
                    return res.status(statusCode_1.default.HTTP_UNAUTHORIZED).json({
                        success: false,
                        message: responseMessage_1.default.HTTP_UNAUTHORIZED,
                    });
                }
                else {
                    req.admin = verify;
                    next();
                }
            }
        });
    }
}
exports.default = AuthChecker;
