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
class memberQuestionModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    // insert user admin
    getEvaluationQuestions(organization_id, evaluation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluationQuestions = yield this.db('questions_v2_view')
                .withSchema(this.EVO)
                .where({ organization_id: organization_id })
                .andWhere({ evaluation_id: evaluation_id })
                .andWhere({ is_deleted: false })
                .select('*');
            return evaluationQuestions;
        });
    }
    //create response
    createResponses(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield this.db('responses_v2')
                .withSchema(this.EVO)
                .insert(payload);
            return userMember;
        });
    }
}
exports.default = memberQuestionModel;
