import Joi from "joi";

class EmployeeValidator {
  //login validator

  public employeeLoginValidator = Joi.object({
    email: Joi.string().lowercase().required(),
    password: Joi.string().required(),
  });

  public employeeProfileUpdateValidator = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    designation: Joi.string(),
    photo: Joi.string(),
  });

  public createOrUpdateEmployeeLocationValidator = Joi.object({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).optional(),
    timestamp: Joi.date().iso().optional(),
    ip_address: Joi.string().ip().optional(),
    device_id: Joi.string().max(100).optional(),
    accuracy: Joi.number().positive().optional(),
    location_type: Joi.string().max(50).optional(),
    notes: Joi.string().optional(),
  });

  public employeeForgetPasswordValidator = Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Provide valid token",
      "string.base": "Provide valid token",
    }),
    email: Joi.string().required().messages({
      "any.required": "Provide valid email",
      "string.base": "Provide valid email",
    }),
    password: Joi.string().min(8).required().messages({
      "any.required": "Please provide a valid password",
      "string.min": "Password length must be at least 8 characters",
      "string.base": "Please provide a valid password",
    }),
  });
}

export default EmployeeValidator;
