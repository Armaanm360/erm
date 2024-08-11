"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const discussion_controller_1 = __importDefault(require("../controllers/discussion.controller"));
class AdminDiscussionRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.AdminDiscussionController = new discussion_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //create discussion
        this.router
            .route("/polls")
            .post(this.uploader.cloudUploadRaw(this.fileFolders.POLLS), this.AdminDiscussionController.createPolls)
            .get(this.AdminDiscussionController.getAllPolls);
        this.router
            .route("/polls/:id")
            .get(this.AdminDiscussionController.getSinglePolls);
        this.router
            .route("/")
            .post(this.AdminDiscussionController.createDiscussion)
            .get(this.AdminDiscussionController.getAllDiscussion);
        this.router
            .route("/:id")
            .get(this.AdminDiscussionController.getSingleDiscussion)
            .patch(this.AdminDiscussionController.updateDiscussion)
            .delete(this.AdminDiscussionController.deleteDiscussion);
        this.router
            .route("/comment")
            .post(this.AdminDiscussionController.createComment);
        this.router
            .route("/comment/:id")
            .delete(this.AdminDiscussionController.deleteComment);
    }
}
exports.default = AdminDiscussionRouter;
