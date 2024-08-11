"use strict";
// import { Request } from "express";
// import AbstractServices from "../../abstract/abstract.service";
// import config from "../../config/config";
// import Lib from "../../utils/lib/lib";
// import { OTP_EMAIL_SUBJECT } from "../../utils/miscellaneous/constants";
// import { sendEmailVerificationTemplate } from "../../utils/templates/newVarofy";
// class userService extends AbstractServices {
//   constructor() {
//     super();
//   }
//   //create team
//   public async createTeam(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { level } = req.employee;
//       if (level > 2) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "You Dont Have Permission To Create Teams",
//         };
//       }
//       req.body["association_id"] = association_id;
//       const model = this.Model.userModel();
//       const checkUser = await model.checkTeams(
//         req.body.team_name,
//         association_id
//       );
//       if (checkUser.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "The Team Has Been Already Created",
//         };
//       }
//       const createTeam = await model.createTeam(req.body);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   public async getTeam(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { id } = req.employee;
//       const model = this.Model.userModel();
//       if (req.employee.level <= 2) {
//         const getTeams = await model.getTeam(association_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getTeams,
//         };
//       }
//       if (req.employee.level >= 3) {
//         const myTeam = await model.myTeam(req.employee.id);
//         console.log(myTeam);
//         const team = myTeam[0].team_id;
//         const getTeams = await model.getMyTeam(team);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getTeams,
//         };
//       }
//       return {
//         success: false,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: "No Data Found",
//       };
//     });
//   }
//   public async getCurrentTeams(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const teamid = parseInt(req.params.teamid);
//       const model = this.Model.userModel();
//       const teams = await model.getRemainingTeam(association_id, teamid);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: teams,
//       };
//     });
//   }
//   public async getUnPointedUser(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { id } = req.employee;
//       const model = this.Model.userModel();
//       //get all users 4
//       const fetchMembers = await model.getRegisterdEmployee(association_id);
//       const employees = fetchMembers.map((item) => item.user_id);
//       const appointedUsers = await model.getAppointedUsers(employees);
//       const appointedEmployees = appointedUsers.map((item) => item.user_id);
//       const getUnappointedEmployees = await model.getUnAppointedUsers(
//         association_id,
//         appointedEmployees
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: getUnappointedEmployees,
//       };
//     });
//   }
//   public async getTeamPositionWiseUser(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const team_id = parseInt(req.params.team_id);
//       const level = parseInt(req.params.level);
//       const model = this.Model.userModel();
//       const getTeamUser = await model.teamPositionWiseUser(team_id, level);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: getTeamUser,
//       };
//     });
//   }
//   //getAllSuperUsers
//   public async getAllSuperUsers(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       if (req.employee.level <= 2) {
//         const getTeams = await model.getAllSuperUsers(association_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getTeams,
//         };
//       }
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: [],
//       };
//     });
//   }
//   // public async getMemberUserWise(req: Request) {
//   //   return this.db.transaction(async (trx) => {
//   //     const { association_id } = req.member;
//   //     const team_id = parseInt(req.params.id);
//   //     const model = this.Model.userModel();
//   //     const getTeams = await model.getMemberUserWise(association_id);
//   //     return {
//   //       success: true,
//   //       code: this.StatusCode.HTTP_SUCCESSFUL,
//   //       message: this.ResMsg.HTTP_SUCCESSFUL,
//   //       data: getTeams,
//   //     };
//   //   });
//   // }
//   public async getMemberUserWise(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const team_id = parseInt(req.params.id);
//       const model = this.Model.userModel();
//       const { userMember, teaminfo } = await model.getTeamWiseMembers(
//         association_id,
//         team_id
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: userMember,
//         team_name: teaminfo,
//         team_ranking: "4",
//       };
//     });
//   }
//   public async createMember(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { password, ...rest } = req.body;
//       const user_level = req.employee.level;
//       const memberModel = this.Model.memberModel(trx);
//       if (req.body.level === 3) {
//         const checkTL = await memberModel.checkTeamLeaderExsist(
//           parseInt(req.params.id)
//         );
//         if (checkTL.length) {
//           return {
//             success: false,
//             code: this.StatusCode.HTTP_BAD_REQUEST,
//             message: "A Team Leader Has Already Created In THis Group",
//           };
//         }
//       }
//       //check user
//       const checkUser = await memberModel.checkUser({
//         email: rest.email,
//       });
//       if (checkUser.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "Email is already exists",
//         };
//       }
//       if (req.body.level <= user_level) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "You Dont Have Permission",
//         };
//       }
//       //password hashing
//       // const hashedPass = await Lib.hashPass(password);
//       //creating member
//       rest["association_id"] = req.employee.association_id;
//       const hashedPass = await Lib.hashPass("12345678");
//       const registration = await memberModel.insertUserMember({
//         password: hashedPass,
//         ...rest,
//       });
//       const team_id = req.params.id;
//       //creating team_user
//       const userteams = await memberModel.insertTeamMember(
//         parseInt(team_id),
//         registration[0].user_id
//       );
//       //retrieve token data
//       const tokenData = {
//         id: registration[0].user_id,
//         name: rest.name,
//         username: rest.username,
//         designation: rest.designation,
//         level: rest.level,
//         association_id: rest.association_id,
//         email: rest.email,
//         phone: rest.phone,
//       };
//       const token = Lib.createToken(
//         tokenData,
//         config.JWT_SECRET_EMPLOYEE,
//         "800h"
//       );
//       if (registration.length) {
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_OK,
//           message: this.ResMsg.HTTP_OK,
//           data: { ...tokenData },
//           token,
//         };
//       } else {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: this.ResMsg.HTTP_BAD_REQUEST,
//         };
//       }
//     });
//   }
//   //create employee
//   public async createEmployee(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { password, ...rest } = req.body;
//       const user_level = req.employee.level;
//       const memberModel = this.Model.memberModel(trx);
//       //check user
//       const checkUser = await memberModel.checkUser({
//         email: rest.email,
//       });
//       if (checkUser.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "Email already exists",
//         };
//       }
//       //check phone
//       const checkPhone = await memberModel.checkPhone({
//         phone: rest.phone,
//       });
//       if (checkPhone.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "Phone Number Already exists",
//         };
//       }
//       //check phone
//       const checkUsername = await memberModel.checkUsername({
//         username: rest.username,
//       });
//       if (checkUsername.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "Username Already exists",
//         };
//       }
//       //creating member
//       rest["association_id"] = req.employee.association_id;
//       rest["level"] = 4;
//       const hashedPass = await Lib.hashPass("12345678");
//       const registration = await memberModel.insertUserMember({
//         password: hashedPass,
//         ...rest,
//       });
//       const tokenData = {
//         id: registration[0].user_id,
//         name: rest.name,
//         username: rest.username,
//         designation: rest.designation,
//         level: rest.level,
//         association_id: rest.association_id,
//         email: rest.email,
//         phone: rest.phone,
//       };
//       const token = Lib.createToken(
//         tokenData,
//         config.JWT_SECRET_EMPLOYEE,
//         "800h"
//       );
//       if (registration.length) {
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_OK,
//           message: this.ResMsg.HTTP_OK,
//           data: { ...tokenData },
//           token,
//         };
//       } else {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: this.ResMsg.HTTP_BAD_REQUEST,
//         };
//       }
//     });
//   }
//   //Assign Employee to team
//   public async assignEmployeeToTeam(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       const createTeam = await model.assignEmployeeToTeam(req.body);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   //Assign Employee to team
//   public async switchEmployeeToOtherTeam(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const user_id = parseInt(req.params.userid);
//       const model = this.Model.userModel();
//       const changeTeam = await model.switchEmployeeToOtherTeam(
//         user_id,
//         req.body
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//       };
//     });
//   }
//   //Assign Employee to team leader
//   public async assignEmployeeToTeamLeader(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const team_id = parseInt(req.params.teamid);
//       const user_id = parseInt(req.params.userid);
//       const model = this.Model.userModel();
//       /* Check if teamleader exsists */
//       const lastAppointedTeamLeader = await model.exsistingTeamLeaderID(
//         team_id
//       );
//       if (lastAppointedTeamLeader.length) {
//         //change it to team leader
//         const exsistingTeamLeaderStatusChange =
//           await model.exsistingTeamLeaderStatusChange(
//             lastAppointedTeamLeader[0].user_id
//           );
//         const assignEmployeeToTeamLeader =
//           await model.assignEmployeeToTeamLeader(user_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//         };
//       } else {
//         const assignEmployeeToTeamLeader =
//           await model.assignEmployeeToTeamLeader(user_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//         };
//       }
//     });
//   }
//   //update member
//   public async updateMember(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const user_level = req.employee.level;
//       const memberModel = this.Model.memberModel(trx);
//       const user_id = parseInt(req.params.id);
//       //check user
//       const checkUser = await memberModel.getProfile(user_id);
//       const getemail = checkUser[0].email;
//       // Define the possible characters for the password
//       const characters = "0123456789";
//       // Initialize an empty string to store the password
//       let password = "12345678";
//       // Generate a 6-digit random password
//       // for (let i = 0; i < 6; i++) {
//       //   const randomIndex = Math.floor(Math.random() * characters.length);
//       //   password += characters.charAt(randomIndex);
//       // }
//       await Lib.sendEmail(
//         getemail,
//         OTP_EMAIL_SUBJECT,
//         sendEmailVerificationTemplate(
//           checkUser[0].name,
//           checkUser[0].email,
//           password
//         )
//       );
//       const hashedPass = await Lib.hashPass(password);
//       await memberModel.activateProfile(user_id, hashedPass);
//       //check user
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//       };
//     });
//   }
//   //create quesitons
//   //create team
//   public async createQuestions(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { level } = req.employee;
//       if (level > 2) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "You Dont Have Permission To Create Questions",
//         };
//       }
//       req.body["provided_by"] = association_id;
//       const model = this.Model.userModel();
//       //  const checkUser = await model.checkTeams(req.body.team_name,association_id);
//       //  if (checkUser.length) {
//       //   return {
//       //       success: false,
//       //       code: this.StatusCode.HTTP_BAD_REQUEST,
//       //       message: 'The Team Has Been Already Created'
//       //     };
//       //  }
//       const createTeam = await model.createQuestions(req.body);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   public async getQuestions(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       const questions = await model.getQuestions(association_id);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: questions,
//       };
//     });
//   }
//   public async getEvaluationQuestions(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const evaluation_id = parseInt(req.params.id);
//       const model = this.Model.userModel();
//       const questions = await model.getEvaluationQuestions(evaluation_id);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: questions,
//       };
//     });
//   }
//   public async getEvaluationQuestionsLevel(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const evaluation_id = parseInt(req.params.evaluation_id);
//       const level = parseInt(req.params.level);
//       const model = this.Model.userModel();
//       const questions = await model.getEvaluationQuestionsLevel(
//         evaluation_id,
//         level
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: questions,
//       };
//     });
//   }
//   //Evaluation
//   //create evaluation
//   public async createEvaluation(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { level } = req.employee;
//       if (level > 2) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "You Dont Have Permission To Create Evaluation",
//         };
//       }
//       const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//       let code = "";
//       for (let i = 0; i < 9; i++) {
//         const randomIndex = Math.floor(Math.random() * alphabet.length);
//         code += alphabet.charAt(randomIndex);
//       }
//       req.body["evaluation_code"] = code;
//       req.body["association_id"] = association_id;
//       const model = this.Model.userModel();
//       const createTeam = await model.createEvaluation(req.body);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   public async getEvaluationWise(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const evaluation_id = parseInt(req.params.id);
//       const evaluate_by = req.employee.id;
//       const evaluate_by_level = req.employee.level;
//       const model = this.Model.userModel();
//       const getEvaluationInfo = await model.getEvaluationInfo(
//         association_id,
//         evaluation_id
//       );
//       const eleminated = await model.getEvaluated(
//         association_id,
//         evaluation_id,
//         evaluate_by
//       );
//       const resultArray = eleminated.map((item) => item.evaluate_to);
//       // Create a map to store unique evaluate_to values
//       if (evaluate_by_level <= 2) {
//         const final = await model.getRestUsers(
//           association_id,
//           resultArray,
//           evaluate_by
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: final,
//           evaluation: getEvaluationInfo[0].evaluation_name,
//         };
//       }
//       if (evaluate_by_level === 3) {
//         const team_id = await model.getTeamId(req.employee.id);
//         const finalTeamLeader = await model.getRestUsersTeam(
//           association_id,
//           resultArray,
//           evaluate_by,
//           team_id
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: finalTeamLeader,
//           evaluation: getEvaluationInfo[0].evaluation_name,
//         };
//       } else {
//         if (resultArray.length) {
//           return {
//             success: true,
//             code: this.StatusCode.HTTP_SUCCESSFUL,
//             message: this.ResMsg.HTTP_SUCCESSFUL,
//             data: [],
//             evaluation: getEvaluationInfo[0].evaluation_name,
//           };
//         }
//         const finalTeamLeader = await model.getRestUsersEmployee(
//           association_id,
//           resultArray,
//           evaluate_by
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: finalTeamLeader,
//           evaluation: getEvaluationInfo[0].evaluation_name,
//           evaluation_date_range: getEvaluationInfo[0].evaluation_name,
//         };
//       }
//     });
//   }
//   public async getEvaluatedUsers(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const level = req.employee.level;
//       const evaluation_id = parseInt(req.params.id);
//       const evaluate_by = req.employee.id;
//       const evaluate_by_level = req.employee.level;
//       const model = this.Model.userModel();
//       const getEvaluated = await model.getEvaluated(
//         association_id,
//         evaluation_id,
//         evaluate_by
//       );
//       const evaluated = getEvaluated.map((item) => item.evaluate_to);
//       if (level <= 2) {
//         const final = await model.getEvaluatedUsersSuper(
//           association_id,
//           evaluate_by,
//           evaluated
//         );
//       }
//       const final = await model.getEvaluatedUsers(
//         association_id,
//         evaluate_by,
//         evaluated
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: final,
//       };
//     });
//   }
//   public async getEvaluation(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       if (req.employee.level <= 2) {
//         const evaluation = await model.getEvaluation(association_id);
//         const users = evaluation.map((item) => item.evaluation_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: evaluation,
//         };
//       }
//       if (req.employee.level >= 3) {
//         const team_id = req.employee.id;
//         const evaluation = await model.getEvaluationEmployee(
//           association_id,
//           team_id
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: evaluation,
//         };
//       }
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//       };
//     });
//   }
//   public async updateEvaluation(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const model = this.Model.userModel();
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const evaluation_id = parseInt(req.params.id);
//       if (level <= 2) {
//         // const teamid = await model.getTeamId(user_id);
//         const paramsTeamId = await model.updateEvaluation(
//           evaluation_id,
//           req.body
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: req.body,
//         };
//       }
//       return {
//         success: false,
//         code: this.StatusCode.HTTP_BAD_REQUEST,
//         message: this.ResMsg.HTTP_BAD_REQUEST,
//       };
//     });
//   }
//   //Responses
//   //create evaluation
//   public async createResponses(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       const createEvaluationsPromises = req.body.map(
//         async (evaluation: any) => {
//           // Assuming createEvaluation method exists in your model
//           await model.createResponses(evaluation);
//         }
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   public async getResponses(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const model = this.Model.userModel();
//       const questions = await model.getEvaluation(association_id);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: questions,
//       };
//     });
//   }
//   //Responses
//   //create evaluation
//   public async createActivity(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id, id } = req.employee;
//       const model = this.Model.userModel();
//       const createEvaluationsPromises = req.body.map(
//         async (evaluation: any) => {
//           evaluation["association_id"] = association_id;
//           evaluation["employee_id"] = id;
//           await model.createActivity(evaluation);
//         }
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: req.body,
//       };
//     });
//   }
//   public async getActivities(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const model = this.Model.userModel();
//       const employee_id = id;
//       if (level === 3) {
//         const { getAllActivities, teamMembers, total } =
//           await model.getActivitiesAll(association_id, req);
//         //const getTeamUsers = await model.teamMembers(association_id, req);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getAllActivities,
//           total: total,
//           teamMembers: teamMembers,
//         };
//       }
//       if (level <= 2) {
//         const { getAllActivities, teamMembers, total } =
//           await model.getActivitiesAll(association_id, req);
//         //const getTeamUsers = await model.teamMembers(association_id, req);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getAllActivities,
//           total: total,
//           teamMembers: teamMembers,
//         };
//       }
//       const data = await model.getActivitiesUserWise(
//         association_id,
//         employee_id
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: data,
//       };
//     });
//   }
//   public async updateActivity(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const model = this.Model.userModel();
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const log_employee_team = parseInt(req.params.id);
//       if (level == 3) {
//         const teamid = await model.getTeamId(id);
//         const paramsTeamId = await model.logIdWiseTeam(log_employee_team);
//         if (teamid != paramsTeamId) {
//           return {
//             success: false,
//             code: this.StatusCode.HTTP_BAD_REQUEST,
//             message: this.ResMsg.HTTP_BAD_REQUEST,
//           };
//         }
//         if (teamid == paramsTeamId && level != 3) {
//         }
//         const data = await model.updateActivity(parseInt(req.params.id));
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//         };
//       }
//       const data = await model.updateActivity(parseInt(req.params.id));
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//       };
//     });
//   }
//   public async updateActivityRemark(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const model = this.Model.userModel();
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const log_employee_team = parseInt(req.params.id);
//       if (level == 3) {
//         const teamid = await model.getTeamId(id);
//         const paramsTeamId = await model.logIdWiseTeam(log_employee_team);
//         if (teamid != paramsTeamId) {
//           return {
//             success: false,
//             code: this.StatusCode.HTTP_BAD_REQUEST,
//             message: this.ResMsg.HTTP_BAD_REQUEST,
//           };
//         }
//         if (teamid == paramsTeamId && level != 3) {
//         }
//         const data = await model.updateRemark(
//           parseInt(req.params.id),
//           req.body.remark
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//         };
//       }
//       const data = await model.updateActivity(parseInt(req.params.id));
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//       };
//     });
//   }
//   //get report responses evaluation
//   public async getEvaluationReport(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const evaluation_id = parseInt(req.params.id);
//       const model = this.Model.userModel();
//       const employee_id = id;
//       if (level === 3) {
//         const getTeam = await model.getTeamId(id);
//         const getAllActivities = await model.getAllEvaluationResponses(
//           association_id,
//           evaluation_id,
//           getTeam,
//           req
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getAllActivities.data,
//           total: getAllActivities.total,
//         };
//       }
//       if (level <= 2) {
//         const teamid = null;
//         const getAllActivities = await model.getAllEvaluationResponses(
//           association_id,
//           evaluation_id,
//           teamid,
//           req
//         );
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getAllActivities.data,
//           total: getAllActivities.total,
//         };
//       }
//       const data = await model.getActivitiesUserWise(
//         association_id,
//         employee_id
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: data,
//       };
//     });
//   }
//   public async getEvaluationReportTeamWise(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { association_id } = req.employee;
//       const { id } = req.employee;
//       const level = req.employee.level;
//       const evaluation_id = parseInt(req.params.id);
//       const team_id = parseInt(req.params.teamid);
//       const model = this.Model.userModel();
//       //calculation
//       const getActualMarks = (evaluate_by: number, achieved_marks: number) => {
//         if (evaluate_by == 1) {
//           const calculate = (45 / 100) * achieved_marks;
//           return parseFloat(calculate.toFixed(2));
//         } else if (evaluate_by == 2) {
//           const calculate = (35 / 100) * achieved_marks;
//           return parseFloat(calculate.toFixed(2));
//         } else if (evaluate_by == 3) {
//           const calculate = (15 / 100) * achieved_marks;
//           return parseFloat(calculate.toFixed(2));
//         } else {
//           const calculate = (5 / 100) * achieved_marks;
//           return parseFloat(calculate.toFixed(2));
//         }
//       };
//       //get level wise standard
//       const getStandard = (evaluate_by: number) => {
//         if (evaluate_by == 1) {
//           return 45;
//         } else if (evaluate_by == 2) {
//           return 35;
//         } else if (evaluate_by == 3) {
//           return 15;
//         } else {
//           return 5;
//         }
//       };
//       const teamMembers = await model.getTeamMembers(team_id);
//       const resultArray = teamMembers.map((item) => item.user_id);
//       // Perform an asynchronous operation on each element of the array
//       const teamReportsPromises = resultArray.map(async (evaluate_to) => {
//         // Get data for the current evaluate_to
//         const { userMember } = await model.testv2(evaluation_id, evaluate_to);
//         const profileInfo = await model.getProfile(evaluate_to);
//         // Group data by evaluate_by dynamically
//         // ...
//         // Group data by evaluate_by dynamically
//         const groupedData = await userMember.reduce(
//           async (accPromise, item) => {
//             const acc = await accPromise;
//             const { evaluate_by } = item;
//             if (!acc[evaluate_by]) {
//               const userName = await model.getProfile(evaluate_by);
//               acc[evaluate_by] = {
//                 evaluate_by: userName[0].name,
//                 evaluate_by_designation: userName[0].designation,
//                 evaluate_by_level: userName[0].level,
//                 responses: [],
//                 total_mark_achieved: 0, // Initialize total_mark_achieved
//                 total_questions: 0, // Initialize total_questions
//                 achieved_marks: 0,
//                 actual_mark: 0,
//                 percentage: 0,
//                 levelmark: 0,
//               };
//             }
//             // Sum option_mark for total_mark_achieved
//             acc[evaluate_by].total_mark_achieved += item.option_mark;
//             acc[evaluate_by].responses.push({
//               response_id: item.response_id,
//               question_id: item.question_id,
//               question: item.question,
//               response: item.response,
//               mark: item.mark,
//               option_mark: item.option_mark,
//               evaluation_id: item.evaluation_id,
//               evaluated: item.evaluated,
//             });
//             // Count total questions
//             acc[evaluate_by].total_questions =
//               acc[evaluate_by].responses.length;
//             // evaluation
//             acc[evaluate_by].achieved_marks =
//               (acc[evaluate_by].total_mark_achieved /
//                 (acc[evaluate_by].responses.length * 5)) *
//               100;
//             acc[evaluate_by].actual_mark = getActualMarks(
//               acc[evaluate_by].evaluate_by_level,
//               acc[evaluate_by].achieved_marks
//             );
//             acc[evaluate_by].percentage = getActualMarks(
//               acc[evaluate_by].evaluate_by_level,
//               acc[evaluate_by].achieved_marks
//             );
//             acc[evaluate_by].levelmark = getStandard(
//               acc[evaluate_by].evaluate_by_level
//             );
//             return acc;
//           },
//           Promise.resolve({})
//         );
//         // ...
//         const evaluateByDataArray = Object.values(groupedData);
//         return {
//           evaluate_to,
//           evaluate_to_name: profileInfo[0].name,
//           evaluate_to_designation: profileInfo[0].designation,
//           evaluate_to_level: profileInfo[0].level,
//           get_total_logs: await model.getTotalLogsOfUser(evaluate_to),
//           get_total_remarked_logs: await model.getTotalLogsRemarkedOfUser(
//             evaluate_to
//           ),
//           get_total_verified_logs: await model.getTotalVerifiedLogsOfUser(
//             evaluate_to
//           ),
//           evaluateByData: evaluateByDataArray,
//         };
//       });
//       // Wait for all asynchronous operations to complete
//       const teamReports = await Promise.all(teamReportsPromises);
//       const teamInfo = await model.teamInfo(team_id);
//       const evaluationame = await model.getEvaluationInfo(
//         association_id,
//         evaluation_id
//       );
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: teamReports,
//         teamname: teamInfo[0].team_name,
//         evaluationame: evaluationame[0].evaluation_name,
//       };
//     });
//   }
//   //upsert shift
//   public async upsertShift(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const user_id = req.params.id;
//       //check if shift user exsists
//       const model = this.Model.userModel();
//       const check_user_id = await model.checkUserIdShift(parseInt(user_id));
//       req.body["user_id"] = parseInt(user_id);
//       if (req.employee.level <= 2) {
//         if (check_user_id.length) {
//           const updateShift = await model.updateUserIdShift(
//             parseInt(user_id),
//             req.body
//           );
//           return {
//             success: true,
//             code: this.StatusCode.HTTP_SUCCESSFUL,
//             message: this.ResMsg.HTTP_SUCCESSFUL,
//             data: req.body,
//           };
//         }
//         const createShift = await model.createUserShift(req.body);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: req.body,
//         };
//       }
//       return {
//         success: false,
//         code: this.StatusCode.HTTP_BAD_REQUEST,
//         message: this.ResMsg.HTTP_BAD_REQUEST,
//       };
//     });
//   }
//   public async dashboardData(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const { id } = req.employee;
//       const { association_id } = req.employee;
//       const { level } = req.employee;
//       if (level <= 2) {
//         const model = this.Model.userModel();
//         const {
//           total_employee,
//           total_activity_log,
//           total_teams,
//           verified_log,
//           unverified_log,
//           active_users,
//           top_teams,
//         } = await model.getDashboardData(association_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           total_employee: total_employee,
//           total_activities: total_activity_log,
//           unverified_log: unverified_log,
//           verified_log: verified_log,
//           total_teams: total_teams,
//           active_users: active_users,
//           top_teams: top_teams,
//         };
//       }
//       if (level === 3) {
//         const model = this.Model.userModel();
//         const teamid = await model.getTeamId(id);
//         const {
//           total_activity_log,
//           verified_log,
//           unverified_log,
//           top_teams,
//           teamlastfiveactivities,
//           today_activities,
//           reportSubmitted,
//         } = await model.getDashboardDataTeamLeader(association_id, id, teamid);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           total_activities: total_activity_log,
//           unverified_log: unverified_log,
//           verified_log: verified_log,
//           today_activities: today_activities,
//           top_teams: top_teams,
//           teamlastfiveactivities: teamlastfiveactivities,
//           reportSubmitted: reportSubmitted,
//         };
//       }
//       if (level === 4) {
//         const model = this.Model.userModel();
//         const {
//           total_evaluation,
//           my_activities,
//           today_activities,
//           verified_log,
//           unverified_log,
//           top_teams,
//           mylastfiveactivities,
//           reportSubmitted,
//           total_activity_log,
//         } = await model.getDashboardDataEmployee(association_id, id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           total_activities: my_activities,
//           unverified_log: unverified_log,
//           verified_log: verified_log,
//           today_activities: today_activities,
//           total_evaluation: total_evaluation,
//           reportSubmitted: reportSubmitted,
//           teamactivity: total_activity_log,
//           mylastfiveactivities: mylastfiveactivities,
//         };
//       }
//       return {
//         success: false,
//         code: this.StatusCode.HTTP_BAD_REQUEST,
//         message: this.ResMsg.HTTP_BAD_REQUEST,
//       };
//     });
//   }
//   //get teamwise  activity
//   public async teamWiseActivity(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const team_id = parseInt(req.params.team_id);
//       const level = req.employee.level;
//       const user_id = req.employee.id;
//       const association_id = req.employee.association_id;
//       const model = this.Model.userModel();
//       const checkTeamExsistence = await model.getTeamsInfo(
//         association_id,
//         team_id
//       );
//       /* check if team exsists */
//       if (!checkTeamExsistence.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "No Team Found",
//           status: this.StatusCode.HTTP_BAD_REQUEST,
//         };
//       }
//       if (level === 4) {
//         const teamMembers = await model.getTeamMembersReleventinfoSingle(
//           team_id,
//           user_id
//         );
//         const getAllActivitiesTeamWise =
//           await model.getTeamWiseActivitiesEmployee(team_id, user_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           team_name: checkTeamExsistence[0].team_name,
//           data: getAllActivitiesTeamWise,
//           teamMembers: teamMembers,
//         };
//       }
//       /* get active team members */
//       const teamMembers = await model.getTeamMembersReleventinfo(team_id);
//       /* full condition for team lead and employee */
//       // const myteamfinder = req.member.team_id;
//       // console.log(myteamfinder);
//       // return;
//       /* end */
//       /* full condition for chairman and ceo*/
//       const getAllActivitiesTeamWise = await model.getTeamWiseActivities(
//         team_id
//       );
//       //const getTeamUsers = await model.teamMembers(association_id, req);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         team_name: checkTeamExsistence[0].team_name,
//         data: getAllActivitiesTeamWise,
//         teamMembers: teamMembers,
//       };
//     });
//   }
//   public async teamWiseActivityToday(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const team_id = parseInt(req.params.team_id);
//       const level = req.employee.level;
//       const association_id = req.employee.association_id;
//       const user_id = req.employee.id;
//       const model = this.Model.userModel();
//       const checkTeamExsistence = await model.getTeamsInfo(
//         association_id,
//         team_id
//       );
//       /* check if team exsists */
//       if (!checkTeamExsistence.length) {
//         return {
//           success: false,
//           code: this.StatusCode.HTTP_BAD_REQUEST,
//           message: "No Team Found",
//           status: this.StatusCode.HTTP_BAD_REQUEST,
//         };
//       }
//       //only for employee
//       if (level === 4) {
//         const teamMembers = await model.getTeamMembersReleventinfoSingle(
//           team_id,
//           user_id
//         );
//         const getAllActivitiesTeamWise =
//           await model.getTeamWiseActivitiesTodayEmployee(team_id, user_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           team_name: checkTeamExsistence[0].team_name,
//           data: getAllActivitiesTeamWise,
//           teamMembers: teamMembers,
//         };
//       }
//       //end of only employee
//       /* get active team members */
//       const teamMembers = await model.getTeamMembersReleventinfo(team_id);
//       /* full condition for team lead and employee */
//       // const myteamfinder = req.member.team_id;
//       // console.log(myteamfinder);
//       // return;
//       /* end */
//       /* full condition for chairman and ceo*/
//       const getAllActivitiesTeamWise = await model.getTeamWiseActivitiesToday(
//         team_id
//       );
//       //const getTeamUsers = await model.teamMembers(association_id, req);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         team_name: checkTeamExsistence[0].team_name,
//         data: getAllActivitiesTeamWise,
//         teamMembers: teamMembers,
//       };
//     });
//   }
//   public async teamWiseActivitySingle(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const team_id = parseInt(req.params.team_id);
//       const user_id = parseInt(req.params.user_id);
//       const level = req.employee.level;
//       /* get active team members */
//       const model = this.Model.userModel();
//       /* full condition for chairman and ceo*/
//       const getAllActivitiesTeamWise = await model.getTeamWiseActivitiesSingle(
//         team_id,
//         user_id
//       );
//       //const getTeamUsers = await model.teamMembers(association_id, req);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: getAllActivitiesTeamWise,
//       };
//     });
//   }
//   public async teamWiseActivitySingleToday(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const team_id = parseInt(req.params.team_id);
//       const user_id = parseInt(req.params.user_id);
//       const level = req.employee.level;
//       /* get active team members */
//       const model = this.Model.userModel();
//       /* full condition for chairman and ceo*/
//       const getAllActivitiesTeamWise =
//         await model.getTeamWiseActivitiesSingleToday(team_id, user_id);
//       //const getTeamUsers = await model.teamMembers(association_id, req);
//       return {
//         success: true,
//         code: this.StatusCode.HTTP_SUCCESSFUL,
//         message: this.ResMsg.HTTP_SUCCESSFUL,
//         data: getAllActivitiesTeamWise,
//       };
//     });
//   }
//   //get employees
//   public async getEmployees(req: Request) {
//     return this.db.transaction(async (trx) => {
//       const association_id = req.employee.association_id;
//       const level = req.employee.level;
//       if (level <= 2) {
//         const model = this.Model.userModel();
//         const getTeamUser = await model.getEmployees(association_id);
//         return {
//           success: true,
//           code: this.StatusCode.HTTP_SUCCESSFUL,
//           message: this.ResMsg.HTTP_SUCCESSFUL,
//           data: getTeamUser,
//         };
//       }
//       return {
//         success: false,
//         code: this.StatusCode.HTTP_BAD_REQUEST,
//         message: this.ResMsg.HTTP_BAD_REQUEST,
//       };
//     });
//   }
// }
// export default userService;
