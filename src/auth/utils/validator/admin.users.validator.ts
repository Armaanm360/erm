import Joi from 'joi';

class AdminUserValidator {
  //login validator

  public createAdminValidator = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    avatar: Joi.string().optional(),
    role: Joi.number().required(),
  });
  public updateAdminValidator = Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
    avatar: Joi.string().optional(),
    role: Joi.number().optional(),
  });

  public updateOrganizationValidator = Joi.object({
    name: Joi.string().optional().label('Name'),
    website: Joi.string().uri().optional().label('Website'),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .optional()
      .label('Phone'),
    country_id: Joi.number().integer().optional().label('Country ID'),
    city_id: Joi.number().integer().optional().label('City ID'),
    address: Joi.string().optional().label('Address'),
    postal_code: Joi.string().optional().label('Postal Code'),
    email: Joi.string().email().optional().label('Email'),
    leave_allowance: Joi.number().optional(),
  });

  public adminLoginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  public adminProfileUpdateValidator = Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    avater: Joi.string().optional(),
    role: Joi.number().optional(),
    employee_id: Joi.number().optional(),
  });

  public adminForgetPasswordValidator = Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Provide valid token',
      'string.base': 'Provide valid token',
    }),
    email: Joi.string().required().messages({
      'any.required': 'Provide valid email',
      'string.base': 'Provide valid email',
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Please provide a valid password',
      'string.min': 'Password length must be at least 8 characters',
      'string.base': 'Please provide a valid password',
    }),
  });
}

export default AdminUserValidator;
