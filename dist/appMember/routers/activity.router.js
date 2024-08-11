"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const activity_controller_1 = __importDefault(require("../controllers/activity.controller"));
class MemberActivityRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.MemberActivityController = new activity_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router
            .route('/my-activity/list/:id')
            .get(this.MemberActivityController.getMyActivityList);
        this.router
            .route('/my-activity/:id')
            .get(this.MemberActivityController.getMyActivity);
        // create activity
        this.router.route('/').post(this.MemberActivityController.createActivity);
        this.router
            .route('/prayer-times')
            .get(this.MemberActivityController.getPrayerTimes);
        this.router
            .route('/log-update/:id')
            .patch(this.MemberActivityController.updateActivityEmployee);
        this.router
            .route('/:id')
            .get(this.MemberActivityController.getActivities)
            .patch(this.MemberActivityController.updateActivity);
    }
}
exports.default = MemberActivityRouter;
