import Joi from 'joi';

class AdminUserValidator {
  //Create Employee Validator
  public createAdminValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional(),
    role: Joi.string().required(),
  });
  //Get All Employee Validator
  public getAllEmployeeValidator = Joi.object({
    limit: Joi.number(),
    skip: Joi.number(),
    key: Joi.string(),
  });
  //Update Employee Validator
  public updateEmployeeValidator = Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    designation: Joi.string().optional(),
    status: Joi.string().optional(),
    shift_id: Joi.number().optional(),
  });
  public employeeShiftValidator = Joi.object({
    shift_name: Joi.string().required(),
    shift_start: Joi.string().required(),
    shift_end: Joi.string().required(),
    working_days: Joi.string().required(),
  });
  //create shift validator
  public createShiftValidator = Joi.object({
    shift_name: Joi.string().required(),
    shift_start: Joi.string().required(),
    shift_end: Joi.string().required(),
    // photo: Joi.string().required(),
  });
  //get all shift validator
  public getAllShiftValidator = Joi.object({
    limit: Joi.number(),
    skip: Joi.number(),
    key: Joi.string(),
  });

  public updateShiftValidator = Joi.object({
    shift_name: Joi.string().optional(),
    shift_start: Joi.string().optional(),
    shift_end: Joi.string().optional(),
  });
}

export default AdminUserValidator;
