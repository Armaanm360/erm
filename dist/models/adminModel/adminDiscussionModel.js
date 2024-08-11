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
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
class adminDiscussionModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    createDiscussion(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('discussion')
                .withSchema(this.DISCUSSION)
                .insert(payload)
                .returning('*');
            return discussion;
        });
    }
    createPoll(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('polls')
                .withSchema(this.DISCUSSION)
                .insert(payload)
                .returning('*');
            return discussion;
        });
    }
    checkIfAlreadyVote(poll_id, employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .where({ employee_id })
                .select('*');
            return discussion;
        });
    }
    castMyVote(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .insert(payload);
            return discussion;
        });
    }
    createOption(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('poll_options')
                .withSchema(this.DISCUSSION)
                .insert(payload);
            return discussion;
        });
    }
    updateDiscussion(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('discussion')
                .withSchema(this.DISCUSSION)
                .where({ id })
                .update(payload);
            return discussion;
        });
    }
    deleteDiscussion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('discussion')
                .withSchema(this.DISCUSSION)
                .where({ id })
                .update({ is_deleted: true });
            return discussion;
        });
    }
    createComment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.db('comment')
                .withSchema(this.DISCUSSION)
                .insert(payload)
                .returning('*');
            return comment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.db('comment')
                .withSchema(this.DISCUSSION)
                .where({ id })
                .update('is_deleted', true);
            return comment;
        });
    }
    getToReplied(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.db('comment')
                .withSchema(this.DISCUSSION)
                .where({ id })
                .select('user_id');
            return comment;
        });
    }
    getAllDiscussion(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('discussionview')
                .withSchema(this.DISCUSSION)
                .where({ organization_id })
                .andWhere({ is_deleted: false })
                .select('id', 'organization_id', 'posted_from', 'user_id', 'discussion', 'status', 'posted_by_name', 'posted_by_photo');
            return { discussion };
        });
    }
    getAllPolls(organization_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const polls = yield this.db('polls')
                .withSchema(this.DISCUSSION)
                .where({ organization_id })
                .andWhere({ is_deleted: false })
                .select('*')
                .orderBy('id', 'desc');
            return { polls };
        });
    }
    getSinglePoll(poll_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const polls = yield this.db('polls')
                .withSchema(this.DISCUSSION)
                .where({ id: poll_id })
                .select('*');
            return { polls };
        });
    }
    getAllEmployeeVote(poll_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('votes_view')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .select('name', 'designation', 'option_text', 'created_at')
                .orderBy('id', 'desc');
        });
    }
    getSingleOptionInfo(poll_id, option_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [option] = yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .where({ option_id })
                .count('id as vote');
            const [total_attendee] = yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .count('id as total');
            const final_attendee = Number(total_attendee.total);
            const final_option = Number(option.vote);
            const percentage = Math.round((final_option / final_attendee) * 100) || 0;
            return { final_option, percentage };
        });
    }
    getSinglePollInfo(poll_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('polls')
                .withSchema(this.DISCUSSION)
                .where({ id: poll_id })
                .select('*');
        });
    }
    getOptionsPollWise(poll_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('poll_options')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .select('*');
            return { data };
        });
    }
    getEmployeeOptionPoll(poll_id, employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .andWhere({ employee_id })
                .select('*');
        });
    }
    countVotes(poll_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db('votes')
                .withSchema(this.DISCUSSION)
                .where({ poll_id })
                .count('id as total');
            const total = data[0].total;
            return { total };
        });
    }
    getSingleDiscussion(organization_id, discussion_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const discussion = yield this.db('discussionview')
                .withSchema(this.DISCUSSION)
                .where({ organization_id })
                .andWhere({ id: discussion_id })
                .select('id', 'organization_id', 'posted_from', 'user_id', 'discussion', 'status', 'posted_by_name', 'posted_by_photo');
            return { discussion };
        });
    }
    getComments(discussion_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.db('comment_view')
                .withSchema(this.DISCUSSION)
                .where({ discussion_id })
                .andWhere({ is_deleted: false })
                .select('id', 'comment_from_type', 'parent_comment_id', 'comment', 'created_at', 'user_name', 'user_photo', 'user_id', 'posted_by_photo', 'posted_by');
            return { comment };
        });
    }
    getCommentsCount(discussion_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.db('comment_view')
                .withSchema(this.DISCUSSION)
                .where({ discussion_id })
                .andWhere({ is_deleted: false })
                .count('id as total');
            return { comment };
        });
    }
    getSingleComment(comment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db('comment')
                .withSchema(this.DISCUSSION)
                .where({ id: comment_id })
                .select('*');
        });
    }
}
exports.default = adminDiscussionModel;
