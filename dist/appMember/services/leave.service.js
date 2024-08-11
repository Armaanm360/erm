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
const socket_1 = require("../../app/socket");
const pushNotification_1 = __importDefault(require("../../common/pushNotification/pushNotification"));
class MemberLeaveService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createLeaveApplication(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminLeaveModel();
                const { id, organization_id } = req.employee;
                req.body["employee_id"] = id;
                req.body["status"] = "pending";
                req.body["organization_id"] = organization_id;
                //check if start date
                const start_date = req.body.start_date;
                const end_date = req.body.start_date;
                const check = yield model.checkDuplicateLeave(id, start_date, end_date);
                //check date exsists
                if (!check.length) {
                    const leave = yield model.createLeave(req.body);
                    //==============================================
                    //                Notification Section
                    //==============================================
                    const get_user_socket_id = yield this.Model.employeeModel().getSingleInfoEmployee(id);
                    const notify = yield this.Model.commonModel().createNotificationAdmin({
                        type: "leave",
                        ref_id: leave[0].id,
                        message: `${get_user_socket_id.name} has applied for leave`,
                    });
                    // Send notification to admins
                    if (get_user_socket_id && get_user_socket_id.socket_id) {
                        const allUsers = yield this.Model.UserAdminModel().getAllAdminSocket(organization_id); // Fetch all connected users
                        if (!allUsers || allUsers.length === 0) {
                            console.error("No connected users found.");
                        }
                        else {
                            // console.log("All connected users:", allUsers);
                            // ========= push notification for app ==========//
                            const accessToken = yield pushNotification_1.default.generateFCMAccessToken();
                            // for website notification
                            allUsers.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                                if (user && user.socket_id) {
                                    socket_1.io.to(user.socket_id).emit("notification", {
                                        message: notify[0].message,
                                        type: "leave",
                                        ref_id: leave[0].id,
                                    });
                                    this.Model.commonModel().addAdminNotification({
                                        notification_id: notify[0].id,
                                        user_id: user.id,
                                    });
                                    yield pushNotification_1.default.sendNotificationToSelectedDriver(accessToken, "Leave Request", req.body.comments, user.device_token);
                                    console.log("Notification emitted to socket ID:", user.socket_id);
                                }
                                else {
                                    console.error("Socket ID not found for user:", user.id);
                                }
                            }));
                        }
                    }
                    else {
                        console.error("Failed to emit notification, socket ID is invalid.");
                    }
                    //==============================================
                    //            End of Notification Section
                    //==============================================
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: "Leave Application Has Been Submitted",
                    };
                }
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: "You have already applied with this certain date",
                };
            }));
        });
    }
    updateLeaveApplication(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const leave_id = Number(req.params.id);
                const model = this.Model.adminLeaveModel();
                const { id } = req.employee;
                req.body["employee_id"] = id;
                req.body["status"] = "pending";
                //check if start date
                yield model.updateLeaveApplicationEmployee(leave_id, id, req.body);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: "Leave Application Has Been Updated",
                };
            }));
        });
    }
    getMyLeaveApplication(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id, organization_id } = req.employee;
                const model = this.Model.adminLeaveModel();
                const { employee } = yield model.getEmployee(id);
                const leave = yield model.getEmployeeLeave(id);
                // Get the employee's leave info
                const { deductible, not_deductible, allowance } = yield model.employeeWiseLeaveInfo(id, organization_id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: leave,
                    deductible: deductible[0].total_leave,
                    not_deductible: not_deductible[0].total_leave,
                    allowance: allowance.leave_allowance,
                };
            }));
        });
    }
    getAllLeaveTypes(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { organization_id } = req.employee;
                const model = this.Model.adminLeaveModel();
                // const team_id = await model.getTeam(employee_id);
                const { leave, total } = yield model.getAllLeaveTypes(organization_id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: this.ResMsg.HTTP_SUCCESSFUL,
                    data: leave,
                    total: total,
                };
            }));
        });
    }
    deleteMyLeaveApplication(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.employee;
                const leave_id = Number(req.params.id);
                const model = this.Model.adminLeaveModel();
                const deleteLeave = yield model.deleteMyLeaveApplicaiton(leave_id, id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: "Leave Application Deleted Successfully",
                };
            }));
        });
    }
}
exports.default = MemberLeaveService;
