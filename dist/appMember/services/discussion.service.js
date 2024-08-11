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
class EmployeeDiscussionService extends abstract_service_1.default {
    constructor() {
        super();
    }
    //create new discussion topic
    createDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id, id } = req.employee;
                req.body["organization_id"] = organization_id;
                req.body["posted_from"] = "employee";
                req.body["user_id"] = id;
                req.body["status"] = "pending";
                yield model.createDiscussion(req.body);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: "Discussion Created Successfully",
                };
            }));
        });
    }
    //create new discussion topic
    castMyVote(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id, id } = req.employee;
                req.body["employee_id"] = id;
                //check if the vote exists in my account
                const getType = yield model.getSinglePollInfo(Number(req.body["poll_id"]));
                if (getType[0].allow_multiple_answers === true) {
                    const optionIds = req.body["option_ids"] || [];
                    const pollId = req.body["poll_id"];
                    yield Promise.all(optionIds.map((optionId) => model.castMyVote({
                        poll_id: pollId,
                        option_id: optionId,
                        employee_id: id,
                    })));
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: "Casted Vote Successfully",
                    };
                }
                const checkAvailable = yield model.checkIfAlreadyVote(parseInt(req.body["poll_id"]), id);
                if (checkAvailable.length === 1) {
                    return {
                        success: false,
                        code: this.StatusCode.HTTP_BAD_REQUEST,
                        message: "Already Casted The Vote",
                    };
                }
                yield model.castMyVote(req.body);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: "Casted Vote Successfully",
                };
            }));
        });
    }
    //create comment on dis
    createComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id, id, name } = req.employee;
                // Ensure 'comment_from_type' and 'user_id' are set
                req.body["comment_from_type"] = "employee";
                req.body["user_id"] = id;
                if (req.body["parent_comment_id"] === null) {
                    const { discussion } = yield model.getSingleDiscussion(organization_id, req.body["discussion_id"]);
                    const userAdmin = yield this.Model.UserAdminModel().getSingleAdminInfo(discussion[0].user_id);
                    //replied to post no parent comment
                    let posterUser = discussion[0].posted_from;
                    yield model.createComment(req.body);
                    if (posterUser === "admin") {
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotificationAdmin({
                            type: "discussion",
                            ref_id: req.body["discussion_id"],
                            message: `${name} Commented On Your Discussion`,
                        });
                        yield this.Model.commonModel().addAdminNotification({
                            notification_id: notify[0].id,
                            user_id: discussion[0].user_id,
                        });
                        if (userAdmin && userAdmin[0].socket_id) {
                            socket_1.io.to(userAdmin[0].socket_id).emit("notification", {
                                message: notify[0].message,
                                type: "discussion",
                                ref_id: req.body["discussion_id"],
                            });
                            console.log("Notification emitted to socket ID:", userAdmin[0].socket_id);
                        }
                        else {
                        }
                        //==============================================
                        //            End of Notification Section
                        //==============================================
                        return {
                            success: true,
                            code: this.StatusCode.HTTP_SUCCESSFUL,
                            message: "Comment Submitted Successfully",
                        };
                    }
                    else {
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotification({
                            type: "discussion",
                            ref_id: req.body["discussion_id"],
                            message: `${name} Commented On Your Discussion`,
                        });
                        yield this.Model.commonModel().addEmployeeNotification({
                            notification_id: notify[0].id,
                            user_id: discussion[0].user_id,
                        });
                        if (userAdmin && userAdmin[0].socket_id) {
                            socket_1.io.to(userAdmin[0].socket_id).emit("notification", {
                                message: notify[0].message,
                                type: "discussion",
                                ref_id: req.body["discussion_id"],
                            });
                            console.log("Notification emitted to socket ID:", userAdmin[0].socket_id);
                        }
                        else {
                            console.error("Failed to emit notification, socket ID is invalid.");
                        }
                        //==============================================
                        //            End of Notification Section
                        //==============================================
                    }
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: "Comment Submitted Successfully",
                    };
                }
                else {
                    yield model.createComment(req.body);
                    const checkCommentType = yield model.getSingleComment(parseInt(req.body["parent_comment_id"]));
                    if (checkCommentType[0].comment_from_type === "admin") {
                        const userAdmin = yield this.Model.UserAdminModel().getSingleAdminInfo(checkCommentType[0].user_id);
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotificationAdmin({
                            type: "discussion",
                            ref_id: req.body["discussion_id"],
                            message: `${name} Replied To Your Comment`,
                        });
                        yield this.Model.commonModel().addAdminNotification({
                            notification_id: notify[0].id,
                            user_id: checkCommentType[0].user_id,
                        });
                        if (userAdmin && userAdmin[0].socket_id) {
                            socket_1.io.to(userAdmin[0].socket_id).emit("notification", {
                                message: notify[0].message,
                                type: "discussion",
                                ref_id: req.body["discussion_id"],
                            });
                            console.log("Notification emitted to socket ID:", userAdmin[0].socket_id);
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
                            message: "Comment Submitted Successfully",
                        };
                    }
                    else {
                        const userEmployee = yield this.Model.employeeModel().getSingleInfoEmployee(checkCommentType[0].user_id);
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotification({
                            type: "discussion",
                            ref_id: req.body["discussion_id"],
                            message: `${name} Replied To Your Comment`,
                        });
                        yield this.Model.commonModel().addEmployeeNotification({
                            notification_id: notify[0].id,
                            user_id: checkCommentType[0].user_id,
                        });
                        if (userEmployee && userEmployee.socket_id) {
                            socket_1.io.to(userEmployee.socket_id).emit("notification", {
                                message: notify[0].message,
                                type: "discussion",
                                ref_id: req.body["discussion_id"],
                            });
                            console.log("Notification emitted to socket ID:", userEmployee.socket_id);
                        }
                        else {
                            console.error("Failed to emit notification, socket ID is invalid.");
                        }
                        //==============================================
                        //            End of Notification Section
                        //==============================================
                    }
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: "Comment Submitted Successfully",
                    };
                }
            }));
        });
    }
    //get all discussion and comments
    //get all discussion and comments
    getAllDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id, id } = req.employee;
            const type = "admin";
            const model = this.Model.adminDiscussionModel();
            // Fetch discussions
            const { discussion } = yield model.getAllDiscussion(organization_id);
            // Fetch and organize comments for each discussion
            for (let i = 0; i < discussion.length; i++) {
                const discussion_id = discussion[i].id;
                const { comment } = yield model.getCommentsCount(discussion_id); // Assuming getComments fetches comments for a discussion
                // // Organize comments into nested structure using recursive function
                // Organize comments into nested structure using recursive function
                discussion[i].total_comments = comment[0].total;
                // want to use reccursive here instead of for loop!
            }
            // Return formatted response
            return {
                success: true,
                data: discussion,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    getSinglePolls(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id, id } = req.employee;
            const model = this.Model.adminDiscussionModel();
            const poll_id = req.params.id;
            // Fetch polls
            const { polls } = yield model.getSinglePoll(Number(poll_id));
            const checkAvailable = yield model.checkIfAlreadyVote(Number(poll_id), id);
            //checking options
            // Fetch options for each poll and add them to the poll object
            const pollsWithOptions = yield Promise.all(polls.map((poll) => __awaiter(this, void 0, void 0, function* () {
                const { data } = yield model.getOptionsPollWise(poll.id);
                const totalVotes = yield model.countVotes(poll.id);
                const optionsWithVotes = yield Promise.all(data.map((option) => __awaiter(this, void 0, void 0, function* () {
                    const [optionVotes, checkAvailable] = yield Promise.all([
                        model.getSingleOptionInfo(poll.id, option.id),
                        model.checkIfAlreadyVote(Number(poll_id), id),
                    ]);
                    const baseOption = {
                        option_text: option.option_text,
                        option_id: option.id,
                        vote_count: optionVotes.final_option,
                        percentage: optionVotes.percentage,
                    };
                    if (checkAvailable.length) {
                        const [checkedInOption] = yield model.getEmployeeOptionPoll(Number(poll_id), id);
                        return Object.assign(Object.assign({}, baseOption), { voted: checkedInOption.option_id });
                    }
                    return Object.assign(Object.assign({}, baseOption), { voted: "" });
                })));
                const checkAvailable = yield model.checkIfAlreadyVote(Number(poll_id), id);
                return Object.assign(Object.assign({}, poll), { total_votes: totalVotes.total, options: optionsWithVotes, voteCasted: checkAvailable.length >= 1 });
            })));
            // Return formatted response
            return {
                success: true,
                data: pollsWithOptions[0],
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    //get all discussion and comments
    getAllPolls(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id } = req.employee;
            const model = this.Model.adminDiscussionModel();
            // Fetch polls
            const { polls } = yield model.getAllPolls(organization_id);
            // Fetch options for each poll and add them to the poll object
            const pollsWithOptions = yield Promise.all(polls.map((poll) => __awaiter(this, void 0, void 0, function* () {
                const { data } = yield model.getOptionsPollWise(poll.id);
                const totalVotes = yield model.countVotes(poll.id);
                const optionsWithVotes = yield Promise.all(data.map((option) => __awaiter(this, void 0, void 0, function* () {
                    const optionVotes = yield model.getSingleOptionInfo(poll.id, option.id);
                    return {
                        option_text: option.option_text,
                        option_id: option.id,
                        vote_count: optionVotes.final_option,
                        percentage: optionVotes.percentage,
                        // Include other option fields as needed
                    };
                })));
                return Object.assign(Object.assign({}, poll), { total_votes: totalVotes.total, options: optionsWithVotes });
            })));
            // Return formatted response
            return {
                success: true,
                data: pollsWithOptions,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    //get single Discussion
    getSingleDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id, id } = req.employee;
            const type = "employee";
            const discussion_id = req.params.id;
            const model = this.Model.adminDiscussionModel();
            // Fetch discussions
            const { discussion } = yield model.getSingleDiscussion(organization_id, parseInt(discussion_id));
            // Fetch and organize comments for each discussion
            for (let i = 0; i < discussion.length; i++) {
                const discussion_id = discussion[i].id;
                const { comment } = yield model.getComments(discussion_id); // Assuming getComments fetches comments for a discussion
                // // Organize comments into nested structure using recursive function
                // Organize comments into nested structure using recursive function
                discussion[i].comments = this.organizeComments(comment, id, type);
                // want to use reccursive here instead of for loop!
            }
            // Return formatted response
            return {
                success: true,
                data: discussion[0],
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    //delete comment
    deleteComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id } = req.employee;
            const comment_id = parseInt(req.params.id);
            console.log("ARMAAN COMMENTING", comment_id);
            yield this.Model.adminDiscussionModel().deleteComment(comment_id);
            // Return formatted response
            return {
                success: true,
                code: this.StatusCode.HTTP_SUCCESSFUL,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    /* private organizeComments(comments: any[],id:Number): any[] {
      const commentMap = new Map();
  
      // First pass: create a map of all comments
      comments.forEach((comment) => {
        comment.replies = [];
        commentMap.set(comment.id, comment);
      });
  
      // Second pass: organize comments into a tree structure
      const rootComments: any[] = [];
      comments.forEach((comment) => {
        if (comment.parent_comment_id === null) {
          rootComments.push(comment);
        } else {
          const parentComment = commentMap.get(comment.parent_comment_id);
          if (parentComment) {
            parentComment.replies.push(comment);
          }
        }
      });
  
      return rootComments;
    } */
    organizeComments(comments, id, type) {
        const commentMap = new Map();
        // First pass: create a map of all comments and add delete_permission
        comments.forEach((comment) => {
            comment.replies = [];
            comment.delete_permission =
                comment.user_id === id && comment.comment_from_type === type;
            commentMap.set(comment.id, comment);
        });
        // Second pass: organize comments into a tree structure
        const rootComments = [];
        comments.forEach((comment) => {
            if (comment.parent_comment_id === null) {
                rootComments.push(comment);
            }
            else {
                const parentComment = commentMap.get(comment.parent_comment_id);
                if (parentComment) {
                    parentComment.replies.push(comment);
                }
            }
        });
        return rootComments;
    }
}
exports.default = EmployeeDiscussionService;
