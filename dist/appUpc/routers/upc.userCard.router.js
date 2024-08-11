"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const upc_userCard_controller_1 = __importDefault(require("../controllers/upc.userCard.controller"));
class UpcUserCardRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new upc_userCard_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // get all card
        this.router.route("/").get(this.controller.getAllCardByUser);
        // card reedem and get all reedem
        this.router
            .route("/reedem")
            .post(this.controller.CardReddem)
            .get(this.controller.getAllReedem);
        // get single card reedem
        this.router.route("/reedem/:id").get(this.controller.getSingleReedem);
        // get single card
        this.router.route("/:id").get(this.controller.getSingleCardByUserAndCardId);
    }
}
exports.default = UpcUserCardRouter;
