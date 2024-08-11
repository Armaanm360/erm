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
const config_1 = __importDefault(require("../../config/config"));
const lib_1 = __importDefault(require("../../utils/lib/lib"));
const constants_1 = require("../../utils/miscellaneous/constants");
class EmployeeAuthService extends abstract_service_1.default {
    //login service
    loginService({ email, password, device_token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeModel = this.Model.employeeModel();
            const checkUser = yield employeeModel.getSingleEmployee({ email });
            if (!checkUser.length) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            const _a = checkUser[0], { password: hashPass, device_token: e_device_token } = _a, rest = __rest(_a, ["password", "device_token"]);
            const checkPass = yield lib_1.default.compare(password, hashPass);
            if (!checkPass) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.WRONG_CREDENTIALS,
                };
            }
            if ((device_token && device_token != e_device_token) ||
                (device_token && e_device_token == "undefined")) {
                yield employeeModel.updateSingleEmployee({ device_token }, { email: rest.email });
            }
            const token = lib_1.default.createToken(Object.assign(Object.assign({ device_token }, rest), { type: "employee" }), config_1.default.JWT_SECRET_EMPLOYEE, "24h");
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: this.ResMsg.LOGIN_SUCCESSFUL,
                token,
                data: Object.assign(Object.assign({}, rest), { device_token }),
            };
        });
    }
    // get profile
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, organization_id } = req.employee;
            const data = yield this.Model.employeeModel().getSingleEmployee({
                id,
            });
            const rest = __rest(data[0], []);
            /* employee permission */
            const roles = yield this.Model.employeeModel().getOrganizationEmployees(organization_id);
            // Extracting unique role IDs
            const employee = [id];
            // Array to store modified response
            // Loop through unique role IDs
            for (const employeeId of employee) {
                // Fetch permission for the current role ID
                const group_permission = yield this.Model.RolePermissionModel().getPermissionGroupIdWiseEmployee(employeeId);
                // Find the role object with the current role ID
                const role = roles.find((role) => role.id === employeeId);
                const uniquePermission = [
                    //role_permission_group_id
                    ...new Set(group_permission.map((up) => up.role_permission_group_id)),
                ];
                // Array to store subModule objects for this role
                const subModules = [];
                if (role && group_permission) {
                    // Fetch subModules for each permission group
                    for (const permission of uniquePermission) {
                        // Use your method to fetch subModules based on permission
                        const subModuleData = yield this.Model.RolePermissionModel().getGroupIdWisePermissionEmployee(permission); // Implement this method
                        subModules.push(subModuleData); // Push fetched subModuleData into subModules array
                    }
                    const authorization = group_permission.map((permission, index) => {
                        return {
                            permission_group_id: permission.id,
                            permission_group_name: permission.name,
                            subModule: subModules[index], // Use the fetched subModules data
                        };
                    });
                    rest.authorization = authorization;
                }
            }
            /* end of employee permission */
            const emp_id = data[0].id;
            const team_leader_id = data[0].team_leader_id;
            if (data.length) {
                // Check if the employee is a team leader
                if (emp_id === team_leader_id) {
                    // If yes, set "team_leader" to true
                    rest.team_leader = true;
                }
                else {
                    // If not, set "team_leader" to false
                    rest.team_leader = false;
                }
                const model = this.Model.memberMeetingModel();
                // Fetch teams the employee belongs to
                const myTeams = yield model.getMyTeams(id);
                // Fetch teams and their leaders
                const teams = yield model.getAllTeamsAndLeaders();
                // Iterate through the employee's teams
                myTeams.forEach((team) => {
                    // Find the corresponding team in the teams array
                    const matchingTeam = teams.find((t) => t.team_id === team.team_id);
                    // If a matching team is found and the employee is the team leader
                    if (matchingTeam && matchingTeam.team_leader_id === id) {
                        team.team_leader = true; // Set team_leader to true
                    }
                    else {
                        team.team_leader = false; // Set team_leader to false
                    }
                });
                //get all employees
                // Extract team_ids where team_leader is true
                const leadedTeamIds = myTeams
                    .filter((team) => team.team_leader)
                    .map((team) => team.team_id);
                //
                if (leadedTeamIds.length < 1) {
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_OK,
                        data: Object.assign(Object.assign({}, rest), { meeting_person_add_avaiablilty: false }),
                    };
                }
                else {
                    const teamColluges = yield model.getAllColluges(leadedTeamIds);
                    return {
                        success: true,
                        code: this.StatusCode.HTTP_OK,
                        data: Object.assign(Object.assign({}, rest), { meeting_person_add_avaiablilty: true, meeting_person: teamColluges }),
                    };
                }
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
        });
    }
    newupdateProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.employee;
            const model = this.Model.employeeModel();
            const checkEmployee = yield model.getSingleEmployee({
                id,
            });
            if (!checkEmployee.length) {
                return {
                    success: true,
                    code: this.StatusCode.HTTP_NOT_FOUND,
                    message: this.ResMsg.HTTP_NOT_FOUND,
                };
            }
            const files = req.files || [];
            if (files.length) {
                req.body[files[0].fieldname] = files[0].filename;
            }
            yield model.updateNewSingleEmployee(id, req.body);
            return {
                success: true,
                code: this.StatusCode.HTTP_OK,
                message: "Profile updated successfully",
            };
        });
    }
    // forget
    forgetService({ token, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenVerify = lib_1.default.verifyToken(token, config_1.default.JWT_SECRET_EMPLOYEE);
            if (!tokenVerify) {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_UNAUTHORIZED,
                    message: this.ResMsg.HTTP_UNAUTHORIZED,
                };
            }
            const { email: verifyEmail, type } = tokenVerify;
            if (email === verifyEmail && type === constants_1.OTP_TYPE_FORGET_EMPLOYEE) {
                const hashPass = yield lib_1.default.hashPass(password);
                const model = this.Model.employeeModel();
                yield model.updateSingleEmployee({ password: hashPass }, { email });
                return {
                    success: true,
                    code: this.StatusCode.HTTP_OK,
                    message: this.ResMsg.HTTP_FULFILLED,
                };
            }
            else {
                return {
                    success: false,
                    code: this.StatusCode.HTTP_BAD_REQUEST,
                    message: this.ResMsg.HTTP_BAD_REQUEST,
                };
            }
        });
    }
}
exports.default = EmployeeAuthService;
