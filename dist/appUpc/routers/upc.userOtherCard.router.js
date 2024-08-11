"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const upc_userOtherCard_controller_1 = __importDefault(require("../controllers/upc.userOtherCard.controller"));
class UpcUserOtherCardRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.controller = new upc_userOtherCard_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        // create and get all card
        this.router
            .route("/")
            .post(this.controller.addOtherCard)
            .get(this.controller.getAllOtherCardByUser);
        // get all service center amenities
        this.router.route("/get-all-amenites").get(this.controller.getAllAmenities);
        // reedem by other card
        this.router.route("/reedem").post(this.controller.reddemByOtherCard);
    }
}
exports.default = UpcUserOtherCardRouter;
