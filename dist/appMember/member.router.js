"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CrmEmplyee_router_1 = __importDefault(require("../appCrm/routers/CrmEmplyee.router"));
const activity_router_1 = __importDefault(require("./routers/activity.router"));
const dashboard_router_1 = __importDefault(require("./routers/dashboard.router"));
const employee_router_1 = __importDefault(require("./routers/employee.router"));
const evaluation_router_1 = __importDefault(require("./routers/evaluation.router"));
const leave_router_1 = __importDefault(require("./routers/leave.router"));
const meeting_router_1 = __importDefault(require("./routers/meeting.router"));
const question_router_1 = __importDefault(require("./routers/question.router"));
const response_router_1 = __importDefault(require("./routers/response.router"));
const team_router_1 = __importDefault(require("./routers/team.router"));
const discussion_router_1 = __importDefault(require("./routers/discussion.router"));
const notice_router_1 = __importDefault(require("./routers/notice.router"));
const requisition_routert_1 = __importDefault(require("./routers/requisition.routert"));
class MemberRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.callRouter();
    }
    callRouter() {
        // teams
        this.router.use('/teams', new team_router_1.default().router);
        //evaluation router
        this.router.use('/evaluation', new evaluation_router_1.default().router);
        //questions router
        this.router.use('/question', new question_router_1.default().router);
        //response router
        this.router.use('/response', new response_router_1.default().router);
        //activity log router
        this.router.use('/activity', new activity_router_1.default().router);
        //dashboard log router
        this.router.use('/dashboard', new dashboard_router_1.default().router);
        //leave  router
        this.router.use('/leave', new leave_router_1.default().router);
        //discussion  router
        this.router.use('/discussion', new discussion_router_1.default().router);
        //meeting  router
        this.router.use('/meeting', new meeting_router_1.default().router);
        // emplyee crm router
        this.router.use('/crm', new CrmEmplyee_router_1.default().router);
        // notice
        this.router.use('/notice', new notice_router_1.default().router);
        // requisition
        this.router.use('/requisition', new requisition_routert_1.default().router);
        // employee
        this.router.use('/', new employee_router_1.default().router);
    }
}
exports.default = MemberRouter;
