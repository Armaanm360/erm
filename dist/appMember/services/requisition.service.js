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
const pushNotification_1 = __importDefault(require("../../common/pushNotification/pushNotification"));
const socket_1 = require("../../app/socket");
class employeeRequisitionService extends abstract_service_1.default {
    constructor() {
        super();
    }
    getMyRequisitions(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, organization_id } = req.employee;
            const { limit, skip, name, employee_name, status, employee_id, item_id, category, from_date, to_date, } = req.query;
            const { total, data } = yield this.Model.requisitionModel().getAllRequisitions(organization_id, {
                name: name,
                employee_name: employee_name,
                status: status,
                category: category,
                employee_id: id,
                from_date: from_date,
                to_date: to_date,
                limit: limit,
                skip: skip,
            });
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
                total,
                data,
            };
        });
    }
    //create a new item for requisition
    createRequisition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.requisitionModel();
                const { organization_id, id } = req.employee;
                req.body['user_id'] = id;
                req.body['organization_id'] = organization_id;
                req.body['status'] = 'PENDING';
                const requisition = yield model.createRequisition(req.body);
                const requisitionTrack = yield model.getSingleRequisition(requisition[0].id);
                //requisition track
                yield model.insertRequisitionTrack({
                    requisition_id: requisition[0].id,
                    status: 'PENDING',
                    track_description: `A requisition has been submitted by ${requisitionTrack.user_name} for ${requisitionTrack.item_name} on ${new Date(requisitionTrack.created_at).toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        dateStyle: 'long',
                        timeStyle: 'short',
                    })} (BST), citing the reason: "${requisitionTrack.require_reason}".`,
                });
                //notification to admin
                //==============================================
                //                Notification Section
                //==============================================
                const get_user_socket_id = yield this.Model.employeeModel().getSingleInfoEmployee(id);
                const notify = yield this.Model.commonModel().createNotificationAdmin({
                    type: 'requisition',
                    ref_id: requisitionTrack.requisition_id,
                    message: `${get_user_socket_id.name} has a created a requisition`,
                });
                // Send notification to admins
                if (get_user_socket_id && get_user_socket_id.socket_id) {
                    const allUsers = yield this.Model.UserAdminModel().getAllAdminSocket(organization_id); // Fetch all connected users
                    if (!allUsers || allUsers.length === 0) {
                        console.error('No connected users found.');
                    }
                    else {
                        // console.log("All connected users:", allUsers);
                        // ========= push notification for app ==========//
                        const accessToken = yield pushNotification_1.default.generateFCMAccessToken();
                        // for website notification
                        allUsers.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                            if (user && user.socket_id) {
                                socket_1.io.to(user.socket_id).emit('notification', {
                                    message: notify[0].message,
                                    type: 'requisition',
                                    ref_id: requisitionTrack.requisition_id,
                                });
                                this.Model.commonModel().addAdminNotification({
                                    notification_id: notify[0].id,
                                    user_id: user.id,
                                });
                                yield pushNotification_1.default.sendNotificationToSelectedDriver(accessToken, 'requisition', req.body.comments, user.device_token);
                                console.log('Notification emitted to socket ID:', user.socket_id);
                            }
                            else {
                                console.error('Socket ID not found for user:', user.id);
                            }
                        }));
                    }
                }
                else {
                    console.error('Failed to emit notification, socket ID is invalid.');
                }
                //==============================================
                //            End of Notification Section
                //==============================================
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: 'Requisition Submitted Successfully',
                };
            }));
        });
    }
    //create a new item for requisition
    updateRequisition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const status = req.body.status;
                const model = this.Model.requisitionModel();
                const requisition_id = Number(req.params.id);
                if (status === 'PENDING') {
                    req.body['status'] = 'PENDING';
                    yield model.updateRequisition(requisition_id, req.body);
                    const requisitionTrack = yield model.getSingleRequisition(requisition_id);
                    //requisition track
                    yield model.insertRequisitionTrack({
                        requisition_id: requisition_id,
                        status: 'UPDATE',
                        track_description: `${requisitionTrack.user_name} has updated the requisition`,
                    });
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: 'Requisition Has Been Updated',
                    };
                }
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.StatusCode.HTTP_BAD_REQUEST,
                };
            }));
        });
    }
    //get my requisition track
    //get all discussion and comments
    getSingleRequisitionTrack(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.Model.requisitionModel();
            const requisition_id = Number(req.params.id);
            const data = yield model.getSingleRequisitionTrack(requisition_id);
            // Return formatted response
            return {
                success: true,
                data: data,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
}
exports.default = employeeRequisitionService;
