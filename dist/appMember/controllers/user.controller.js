"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class UserController extends AbstractController {
//   private UserService = new userService();
//   constructor() {
//     super();
//   }
//   //create team
//   public createTeam = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createTeam(req);
//       res.status(code).json(data);
//     }
//   );
//   public getUnPointedUser = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getUnPointedUser(req);
//       res.status(code).json(data);
//     }
//   );
//   public getTeamPositionWiseUser = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getTeamPositionWiseUser(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   //get team
//   public getTeam = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getTeam(req);
//       res.status(code).json(data);
//     }
//   );
//   //get team
//   public getCurrentTeams = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getCurrentTeams(req);
//       res.status(code).json(data);
//     }
//   );
//   //get team
//   public getAllSuperUsers = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getAllSuperUsers(req);
//       res.status(code).json(data);
//     }
//   );
//   //update member status
//   public updateMemeber = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.updateMember(req);
//       res.status(code).json(data);
//     }
//   );
//   //create user under team
//   public createMember = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createMember(req);
//       res.status(code).json(data);
//     }
//   );
//   //create Employee
//   public createEmployee = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createEmployee(req);
//       res.status(code).json(data);
//     }
//   );
//   //Assign Employee To Team
//   public assignEmployeeToTeam = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.assignEmployeeToTeam(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   //Switch Employee To Other Team
//   public switchEmployeeToOtherTeam = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } =
//         await this.UserService.switchEmployeeToOtherTeam(req);
//       res.status(code).json(data);
//     }
//   );
//   //Assign Team Leader
//   public assignEmployeeToTeamLeader = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } =
//         await this.UserService.assignEmployeeToTeamLeader(req);
//       res.status(code).json(data);
//     }
//   );
//   //create user under team
//   public getMemberUserWise = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getMemberUserWise(req);
//       res.status(code).json(data);
//     }
//   );
//   //questions
//   //create questions
//   public createQuestions = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createQuestions(req);
//       res.status(code).json(data);
//     }
//   );
//   //get questions
//   public getQuestions = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getQuestions(req);
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluationQuestions = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluationQuestions(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluationQuestionsLevel = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } =
//         await this.UserService.getEvaluationQuestionsLevel(req);
//       res.status(code).json(data);
//     }
//   );
//   //questions
//   //create questions
//   public createEvaluation = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createEvaluation(req);
//       res.status(code).json(data);
//     }
//   );
//   //get questions
//   public getEvaluation = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluation(req);
//       res.status(code).json(data);
//     }
//   );
//   public updateEvaluation = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.updateEvaluation(req);
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluationWise = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluationWise(req);
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluatedUsers = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluatedUsers(req);
//       res.status(code).json(data);
//     }
//   );
//   //responses
//   //create questions
//   public createResponses = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createResponses(req);
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluationReport = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluationReport(req);
//       res.status(code).json(data);
//     }
//   );
//   public getEvaluationReportTeamWise = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } =
//         await this.UserService.getEvaluationReportTeamWise(req);
//       res.status(code).json(data);
//     }
//   );
//   //get questions
//   public getResponses = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEvaluation(req);
//       res.status(code).json(data);
//     }
//   );
//   //tasks
//   //create questions
//   public createActivity = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.createActivity(req);
//       res.status(code).json(data);
//     }
//   );
//   //get questions
//   public getActivities = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getActivities(req);
//       res.status(code).json(data);
//     }
//   );
//   //get questions
//   public updateActivity = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.updateActivity(req);
//       res.status(code).json(data);
//     }
//   );
//   //get update Remarks
//   public updateActivityRemark = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.updateActivityRemark(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   //upsert shift
//   public upsertShift = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.upsertShift(req);
//       res.status(code).json(data);
//     }
//   );
//   //dashboard
//   public dashboardData = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.dashboardData(req);
//       res.status(code).json(data);
//     }
//   );
//   //team_wise_
//   public teamWiseActivity = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.teamWiseActivity(req);
//       res.status(code).json(data);
//     }
//   );
//   //team_wise_
//   public teamWiseActivitySingle = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.teamWiseActivitySingle(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   public teamWiseActivitySingleToday = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } =
//         await this.UserService.teamWiseActivitySingleToday(req);
//       res.status(code).json(data);
//     }
//   );
//   public teamWiseActivityToday = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.teamWiseActivityToday(
//         req
//       );
//       res.status(code).json(data);
//     }
//   );
//   //get all employees
//   public getEmployees = this.asyncWrapper.wrap(
//     async (req: Request, res: Response) => {
//       const { code, ...data } = await this.UserService.getEmployees(req);
//       res.status(code).json(data);
//     }
//   );
// }
// export default UserController;
