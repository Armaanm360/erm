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
class UpcUserCardService extends abstract_service_1.default {
    constructor() {
        super();
    }
    // get all card
    getAllCardByUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.upc_user;
            const model = this.Model.upcUserModel();
            const getAllCard = yield model.getAllCardByUser(id);
            const getAllOtherCard = yield model.getAllOtherCardByUser(id);
            const cards = [];
            if (getAllCard.length) {
                for (let i = 0; i < getAllCard.length; i++) {
                    cards.push({
                        id: getAllCard[i].id,
                        card_id: getAllCard[i].card_id,
                        name: getAllCard[i].name,
                        expire_date: getAllCard[i].expire_date,
                        status: getAllCard[i].status,
                        card_number: getAllCard[i].card_number,
                        is_other_card: 0,
                    });
                }
            }
            if (getAllOtherCard.length) {
                for (let i = 0; i < getAllOtherCard.length; i++) {
                    cards.push({
                        id: getAllOtherCard[i].id,
                        expire_date: getAllOtherCard[i].expire_date,
                        status: getAllOtherCard[i].status,
                        card_number: getAllOtherCard[i].card_number,
                        card_type: getAllOtherCard[i].card_type,
                        card_holder_name: getAllOtherCard[i].card_holder_name,
                        is_other_card: 1,
                    });
                }
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: cards,
            };
        });
    }
    // get single card
    getSingleCardByUserAndCardId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.upc_user;
            const { id: card_id } = req.params;
            const model = this.Model.upcUserModel();
            const singleCardData = yield model.getSingleCardByUser({
                upc_user_id: id,
                card_id: parseInt(card_id),
            });
            const usedAmenites = yield model.getUsedAminitesBySingleUserAndCard({
                upc_user_id: id,
                card_id: parseInt(card_id),
            });
            if (!singleCardData.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const { card_user_amenities, card_name, card_id: cardId, } = singleCardData[0];
            const { user_card_used_amenities } = usedAmenites[0];
            let totalUsedAmenities = [];
            let totalRemainAmenities = [];
            if (!user_card_used_amenities.length) {
                totalRemainAmenities = card_user_amenities;
            }
            else {
                for (let i = 0; i < user_card_used_amenities.length; i++) {
                    let found = false;
                    for (let j = 0; j < totalUsedAmenities.length; j++) {
                        if (user_card_used_amenities[i].amenities_id == totalUsedAmenities[j].id) {
                            found = true;
                            const totalQuantity = user_card_used_amenities[i].quantity +
                                totalUsedAmenities[j].quantity;
                            totalUsedAmenities[j].quantity = totalQuantity;
                            break;
                        }
                    }
                    if (!found) {
                        totalUsedAmenities.push({
                            id: user_card_used_amenities[i].amenities_id,
                            name: user_card_used_amenities[i].amenities_name,
                            quantity: user_card_used_amenities[i].quantity,
                        });
                    }
                }
                // remain amenities
                for (let i = 0; i < totalUsedAmenities.length; i++) {
                    let found = false;
                    for (let j = 0; j < card_user_amenities.length; j++) {
                        if (totalUsedAmenities[i].id == card_user_amenities[j].amenities_id) {
                            const totalRQuantity = card_user_amenities[j].quantity - totalUsedAmenities[i].quantity;
                            totalRemainAmenities.push({
                                id: totalUsedAmenities[i].id,
                                name: totalUsedAmenities[i].name,
                                quantity: totalRQuantity,
                            });
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        totalRemainAmenities.push({
                            id: totalUsedAmenities[i].id,
                            name: totalUsedAmenities[i].name,
                            quantity: totalUsedAmenities[i].quantity,
                        });
                    }
                }
                // step 2
                for (let i = 0; i < card_user_amenities.length; i++) {
                    let found = false;
                    for (let j = 0; j < totalRemainAmenities.length; j++) {
                        if (card_user_amenities[i].amenities_id == totalRemainAmenities[j].id) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        totalRemainAmenities.push({
                            id: card_user_amenities[i].amenities_id,
                            name: card_user_amenities[i].name,
                            quantity: card_user_amenities[i].quantity,
                        });
                    }
                }
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: {
                    card_id: cardId,
                    card_name,
                    remain_amenities: totalRemainAmenities,
                },
                // totalCardsAmenities,
                // usedAmenites,
                // totalUsedAmenities,
                // user_card_used_amenities,
                // card_amenities,
            };
        });
    }
    // card  reedem
    cardReedem(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.upc_user;
                const { card_id, service_id, check_in_items } = req.body;
                const cardModel = this.Model.upcCardModel(trx);
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
                //check amenities if available or not
                const upcUsermodel = this.Model.upcUserModel(trx);
                const singleCardData = yield upcUsermodel.getSingleCardByUser({
                    upc_user_id: id,
                    card_id: parseInt(card_id),
                });
                if (!singleCardData.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_NOT_FOUND,
                        message: "Card not found",
                    };
                }
                const usedAmenites = yield upcUsermodel.getUsedAminitesBySingleUserAndCard({
                    upc_user_id: id,
                    card_id: parseInt(card_id),
                });
                const { card_user_amenities } = singleCardData[0];
                const { user_card_used_amenities } = usedAmenites[0];
                let totalRemainAmenities = [];
                if (!user_card_used_amenities.length) {
                    totalRemainAmenities = card_user_amenities;
                }
                else {
                    const total_used_amenities = [];
                    for (let i = 0; i < user_card_used_amenities.length; i++) {
                        let found = false;
                        for (let j = 0; j < total_used_amenities.length; j++) {
                            if (user_card_used_amenities[i].amenities_id ==
                                total_used_amenities[j].amenities_id) {
                                found = true;
                                total_used_amenities;
                                total_used_amenities[j].quantity =
                                    total_used_amenities[j].quantity +
                                        user_card_used_amenities[i].quantity;
                            }
                        }
                        if (!found) {
                            total_used_amenities.push({
                                amenities_id: user_card_used_amenities[i].amenities_id,
                                amenities_name: user_card_used_amenities[i].amenities_name,
                                quantity: user_card_used_amenities[i].quantity,
                            });
                        }
                    }
                    for (let i = 0; i < card_user_amenities.length; i++) {
                        let found = false;
                        for (let j = 0; j < total_used_amenities.length; j++) {
                            if (card_user_amenities[i].amenities_id ==
                                total_used_amenities[j].amenities_id) {
                                found = true;
                                const remainQuantity = card_user_amenities[i].quantity -
                                    total_used_amenities[j].quantity;
                                totalRemainAmenities.push({
                                    amenities_id: card_user_amenities[i].amenities_id,
                                    amenities_name: card_user_amenities[i].name,
                                    quantity: remainQuantity,
                                });
                                break;
                            }
                        }
                        if (!found) {
                            totalRemainAmenities.push({
                                amenities_id: card_user_amenities[i].amenities_id,
                                amenities_name: card_user_amenities[i].name,
                                quantity: card_user_amenities[i].quantity,
                            });
                        }
                    }
                }
                if (!totalRemainAmenities.length) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
                        message: "You have used all amenities",
                    };
                }
                if (totalRemainAmenities.length) {
                    let quantityLargerThanAvailable = false;
                    let found = false;
                    for (let i = 0; i < check_in_items.length; i++) {
                        if (quantityLargerThanAvailable || found) {
                            break;
                        }
                        for (let j = 0; j < totalRemainAmenities.length; j++) {
                            if (check_in_items[i].card_amenities_id ==
                                totalRemainAmenities[j].amenities_id) {
                                found = true;
                                if (check_in_items[i].quantity > totalRemainAmenities[j].quantity) {
                                    quantityLargerThanAvailable = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!found) {
                        return {
                            success: false,
                            code: this.StatusCode.HTTP_BAD_REQUEST,
                            message: "Invalid amenities",
                        };
                    }
                    if (quantityLargerThanAvailable) {
                        return {
                            success: false,
                            code: this.StatusCode.HTTP_BAD_REQUEST,
                            message: "You are doing reedem more than card available amenities",
                        };
                    }
                }
                // check in step
                const checkInRes = yield cardModel.insertCardCheckIn({
                    card_id,
                    service_id,
                    upc_user_id: id,
                });
                const checkInItemsPayload = check_in_items.map((item) => {
                    return {
                        check_in_id: checkInRes[0].id,
                        amenities_id: item.card_amenities_id,
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
    // get all reedem
    getAllReedem(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.upc_user;
            const { limit, skip } = req.query;
            const { data, total } = yield this.Model.upcCardModel().getAllReedemItems({
                upc_user_id: id,
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
    // get single reedem
    getSingleReedem(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Model.upcCardModel().getSingleReedem({
                id: parseInt(req.params.id),
            });
            if (!data.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                data: data[0],
            };
        });
    }
}
exports.default = UpcUserCardService;
