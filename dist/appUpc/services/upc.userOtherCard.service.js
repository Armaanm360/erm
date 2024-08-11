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
class UpcUserOtherCardService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // create other card
    addOtherCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.upc_user;
            const card_model = this.Model.upcCardModel();
            const { card_number, card_type } = req.body;
            // check card
            const data = yield card_model.getAllOtherCard({
                upc_user_id: id,
                card_number,
                card_type,
            });
            if (data.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_CONFLICT,
                    message: this.ResMsg.HTTP_CONFLICT,
                };
            }
            yield card_model.addOtherCard(Object.assign(Object.assign({}, req.body), { upc_user_id: id }));
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: "Card added",
            };
        });
    }
    // get all other card
    getAllOtherCardByUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.upc_user;
            const data = yield this.Model.upcCardModel().getAllOtherCard({
                upc_user_id: id,
                status: 1,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data,
            };
        });
    }
    // get all amenities
    getAllAmenities(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, limit, skip } = req.query;
            const { data, total } = yield this.Model.upcConfigurationModel().getAllAmenities({
                name: name,
                limit: limit,
                skip: skip,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                total,
                data,
            };
        });
    }
    // reedem by other card
    reedemByOtherCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.upc_user;
                const { card_id, service_id, check_in_items } = req.body;
                const cardModel = this.Model.upcCardModel(trx);
                const configModel = this.Model.upcConfigurationModel(trx);
                const serviceCenterModel = this.Model.upcServiceCenterModel(trx);
                // check  service center
                const checkServiceCenter = yield serviceCenterModel.getSingleServiceCenter({ id: service_id });
                if (!checkServiceCenter.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: "Service center not found",
                    };
                }
                // check card
                const checkCard = yield cardModel.getSingleOtherCard({ id: card_id });
                if (!checkCard.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: "Card not found",
                    };
                }
                const amenitiesIds = check_in_items.map((item) => item.amenities_id);
                // check all amenities
                const { data: checkAllAmenities } = yield configModel.getAllAmenities({
                    ids: amenitiesIds,
                });
                if (amenitiesIds.length != checkAllAmenities.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_BAD_REQUEST,
                        message: "Provided wrong amenities id",
                    };
                }
                let total_amount = 0;
                for (let i = 0; i < check_in_items.length; i++) {
                    for (let j = 0; j < checkAllAmenities.length; j++) {
                        if (check_in_items[i].amenities_id == checkAllAmenities[j].id) {
                            total_amount =
                                total_amount +
                                    check_in_items[i].quantity * checkAllAmenities[j].unit_price;
                        }
                    }
                }
                // check in step
                const checkInRes = yield cardModel.insertCardCheckIn({
                    service_id,
                    paid_amount: total_amount,
                    upc_user_id: id,
                    other_card_id: card_id,
                });
                const checkInItemsPayload = check_in_items.map((item) => {
                    return {
                        check_in_id: checkInRes[0].id,
                        amenities_id: item.amenities_id,
                        quantity: item.quantity,
                    };
                });
                yield cardModel.insertCardCheckInItems(checkInItemsPayload);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                };
            }));
        });
    }
}
exports.default = UpcUserOtherCardService;
