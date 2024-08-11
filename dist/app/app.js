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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("../common/middleware/errorHandler/errorHandler"));
const customEror_1 = __importDefault(require("../utils/lib/customEror"));
const constants_1 = require("../utils/miscellaneous/constants");
const router_1 = __importDefault(require("./router"));
class App {
    constructor(port) {
        this.origin = constants_1.origin;
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddleware();
        this.initRouters();
        this.notFoundRouter();
        this.errorHandle();
    }
    // start server
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is started at port: ${this.port} 🚀`);
        });
    }
    // init middleware
    initMiddleware() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({ origin: this.origin, credentials: true }));
    }
    // init routers
    initRouters() {
        this.app.get('/', (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(`ERM server is running...🚀`);
        }));
        this.app.use('/api/v1', new router_1.default().v1Router);
    }
    // not found router
    notFoundRouter() {
        this.app.use('*', (_req, _res, next) => {
            next(new customEror_1.default('Cannot found the route', 404));
        });
    }
    //global error handler
    errorHandle() {
        this.app.use(new errorHandler_1.default().handleErrors);
    }
}
exports.default = App;
