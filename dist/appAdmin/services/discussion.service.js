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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const socket_1 = require("../../app/socket");
class AdminDiscussionService extends abstract_service_1.default {
    constructor() {
        super();
    }
    //create new discussion topic
    createDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id, id } = req.admin;
                req.body['organization_id'] = organization_id;
                req.body['posted_from'] = 'admin';
                req.body['user_id'] = id;
                req.body['status'] = 'approved';
                const createDiscussion = yield model.createDiscussion(req.body);
                //==============================================
                //                Notification Section
                //==============================================
                const notify = yield this.Model.commonModel().createNotification({
                    type: 'discussion',
                    ref_id: createDiscussion[0].id,
                    message: `নতুন আলোচনা এসেছে  ${createDiscussion[0].discussion}`,
                });
                // const employeeNotification =
                //   await this.Model.commonModel().addEmployeeNotification({
                //     notification_id: notify[0].id,
                //     user_id: req.body.person_id,
                //   });
                // console.log('Notification added:', employeeNotification);
                const allUsers = yield this.Model.employeeModel().getAllEmployeeSocket(organization_id); // Fetch all connected users
                if (!allUsers || allUsers.length === 0) {
                    console.error('No connected users found.');
                }
                else {
                    console.log('All connected users:', allUsers);
                    allUsers.forEach((user) => {
                        if (user && user.socket_id) {
                            socket_1.io.to(user.socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'discussion',
                                ref_id: createDiscussion[0].id,
                            });
                            console.log('Notification emitted to socket ID:', user.socket_id);
                        }
                        else {
                            console.error('Socket ID not found for user:', user.id);
                        }
                    });
                }
                //==============================================
                //            End of Notification Section
                //==============================================
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: 'Discussion Created Successfully',
                };
            }));
        });
    }
    //create new poll
    createPolls(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id } = req.admin;
                const _a = req.body, { options } = _a, rest = __rest(_a, ["options"]);
                const files = req.files || [];
                if (files.length) {
                    rest['image'] = files[0].filename;
                }
                rest['organization_id'] = organization_id;
                const poll = yield model.createPoll(rest);
                //created poll options
                const jsonParse = JSON.parse(options);
                const createdOptions = new Set();
                for (const option of jsonParse) {
                    if (!createdOptions.has(option.option_text)) {
                        try {
                            yield model.createOption({
                                poll_id: poll[0].id,
                                option_text: option.option_text,
                            });
                            createdOptions.add(option.option_text);
                        }
                        catch (error) {
                            console.error(`Failed to create option: ${option.option_text}`, error);
                        }
                    }
                    else {
                        console.warn(`Duplicate option skipped: ${option.option_text}`);
                    }
                }
                //==============================================
                //                Notification Section
                //==============================================
                const notify = yield this.Model.commonModel().createNotification({
                    type: 'polls',
                    ref_id: poll[0].id,
                    message: `A New Poll Has Been Created  ${poll[0].title}`,
                });
                const allUsers = yield this.Model.employeeModel().getAllEmployeeSocket(organization_id); // Fetch all connected users
                if (!allUsers || allUsers.length === 0) {
                    console.error('No connected users found.');
                }
                else {
                    console.log('All connected users:', allUsers);
                    allUsers.forEach((user) => {
                        if (user && user.socket_id) {
                            socket_1.io.to(user.socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'polls',
                                ref_id: poll[0].id,
                            });
                            console.log('Notification emitted to socket ID:', user.socket_id);
                        }
                        else {
                            console.error('Socket ID not found for user:', user.id);
                        }
                    });
                }
                //==============================================
                //            End of Notification Section
                //==============================================
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: 'Discussion Created Successfully',
                };
            }));
        });
    }
    //update discussion
    updateDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const dis_id = parseInt(req.params.id);
                yield model.updateDiscussion(dis_id, req.body);
                //==============================================
                //            End of Notification Section
                //==============================================
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: 'Discussion Created Successfully',
                };
            }));
        });
    }
    //update discussion
    deleteDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const dis_id = parseInt(req.params.id);
                yield model.deleteDiscussion(dis_id);
                return {
                    success: true,
                    code: this.StatusCode.HTTP_SUCCESSFUL,
                    message: 'Discussion Deleted Successfully',
                };
            }));
        });
    }
    //create comment on dis
    createComment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const model = this.Model.adminDiscussionModel();
                const { organization_id, id, name } = req.admin;
                // Ensure 'comment_from_type' and 'user_id' are set
                req.body['comment_from_type'] = 'admin';
                req.body['user_id'] = id;
                if (req.body['parent_comment_id'] === null) {
                    const { discussion } = yield model.getSingleDiscussion(organization_id, req.body['discussion_id']);
                    const userAdmin = yield this.Model.UserAdminModel().getSingleAdminInfo(discussion[0].user_id);
                    //replied to post no parent comment
                    let posterUser = discussion[0].posted_from;
                    yield model.createComment(req.body);
                    if (posterUser === 'admin') {
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotificationAdmin({
                            type: 'discussion',
                            ref_id: req.body['discussion_id'],
                            message: `${name} Commented On Your Discussion`,
                        });
                        yield this.Model.commonModel().addAdminNotification({
                            notification_id: notify[0].id,
                            user_id: discussion[0].user_id,
                        });
                        if (userAdmin && userAdmin[0].socket_id) {
                            socket_1.io.to(userAdmin[0].socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'discussion',
                                ref_id: req.body['discussion_id'],
                            });
                            console.log('Notification emitted to socket ID:', userAdmin[0].socket_id);
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
                            message: 'Comment Submitted Successfully',
                        };
                    }
                    else {
                        const userEmployee = yield this.Model.employeeModel().getSingleInfoEmployee(discussion[0].user_id);
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotification({
                            type: 'discussion',
                            ref_id: req.body['discussion_id'],
                            message: `${name} Commented On Your Discussion`,
                        });
                        yield this.Model.commonModel().addEmployeeNotification({
                            notification_id: notify[0].id,
                            user_id: discussion[0].user_id,
                        });
                        if (userEmployee && userEmployee.socket_id) {
                            socket_1.io.to(userEmployee.socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'discussion',
                                ref_id: req.body['discussion_id'],
                            });
                            console.log('Notification emitted to socket ID:', userEmployee.socket_id);
                        }
                        else {
                            console.error('Failed to emit notification, socket ID is invalid.');
                        }
                        //==============================================
                        //            End of Notification Section
                        //==============================================
                    }
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: 'Comment Submitted Successfully',
                    };
                }
                else {
                    yield model.createComment(req.body);
                    const checkCommentType = yield model.getSingleComment(parseInt(req.body['parent_comment_id']));
                    if (checkCommentType[0].comment_from_type === 'admin') {
                        const userAdmin = yield this.Model.UserAdminModel().getSingleAdminInfo(checkCommentType[0].user_id);
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotificationAdmin({
                            type: 'discussion',
                            ref_id: req.body['discussion_id'],
                            message: `${name} Replied To Your Comment`,
                        });
                        yield this.Model.commonModel().addAdminNotification({
                            notification_id: notify[0].id,
                            user_id: checkCommentType[0].user_id,
                        });
                        if (userAdmin && userAdmin[0].socket_id) {
                            socket_1.io.to(userAdmin[0].socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'discussion',
                                ref_id: req.body['discussion_id'],
                            });
                            console.log('Notification emitted to socket ID:', userAdmin[0].socket_id);
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
                            message: 'Comment Submitted Successfully',
                        };
                    }
                    else {
                        const userEmployee = yield this.Model.employeeModel().getSingleInfoEmployee(checkCommentType[0].user_id);
                        //==============================================
                        //                Notification Section
                        //==============================================
                        const notify = yield this.Model.commonModel().createNotification({
                            type: 'discussion',
                            ref_id: req.body['discussion_id'],
                            message: `${name} Replied To Your Comment`,
                        });
                        yield this.Model.commonModel().addEmployeeNotification({
                            notification_id: notify[0].id,
                            user_id: checkCommentType[0].user_id,
                        });
                        if (userEmployee && userEmployee.socket_id) {
                            socket_1.io.to(userEmployee.socket_id).emit('notification', {
                                message: notify[0].message,
                                type: 'discussion',
                                ref_id: req.body['discussion_id'],
                            });
                            console.log('Notification emitted to socket ID:', userEmployee.socket_id);
                        }
                        else {
                            console.error('Failed to emit notification, socket ID is invalid.');
                        }
                        //==============================================
                        //            End of Notification Section
                        //==============================================
                    }
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_SUCCESSFUL,
                        message: 'Comment Submitted Successfully',
                    };
                }
            }));
        });
    }
    //get all discussion and comments
    getAllDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id, id } = req.admin;
            const type = 'admin';
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
    //get all discussion and comments
    getAllPolls(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id } = req.admin;
            const model = this.Model.adminDiscussionModel();
            // Fetch polls
            const { polls } = yield model.getAllPolls(organization_id);
            // Fetch options for each poll and add them to the poll object
            const pollsWithOptions = yield Promise.all(polls.map((poll) => __awaiter(this, void 0, void 0, function* () {
                const { data } = yield model.getOptionsPollWise(poll.id);
                return Object.assign(Object.assign({}, poll), { options: data.map((option) => ({
                        option_id: option.id,
                        option_text: option.option_text,
                    })) });
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
    //get all discussion and comments
    getSinglePolls(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.admin;
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
                    const [optionVotes] = yield Promise.all([
                        model.getSingleOptionInfo(poll.id, option.id),
                    ]);
                    const baseOption = {
                        option_text: option.option_text,
                        option_id: option.id,
                        vote_count: optionVotes.final_option,
                        percentage: optionVotes.percentage,
                    };
                    return Object.assign(Object.assign({}, baseOption), { voted: '' });
                })));
                return Object.assign(Object.assign({}, poll), { total_votes: totalVotes.total, options: optionsWithVotes });
            })));
            //get poll wise answers with employee
            const viewData = yield model.getAllEmployeeVote(Number(poll_id));
            // Return formatted response
            return {
                success: true,
                data: pollsWithOptions[0],
                employeeVote: viewData,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.HTTP_OK,
            };
        });
    }
    //get single Discussion
    getSingleDiscussion(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { organization_id, id } = req.admin;
            const { type } = req.admin;
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
            const { organization_id } = req.admin;
            const comment_id = parseInt(req.params.id);
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
exports.default = AdminDiscussionService;
