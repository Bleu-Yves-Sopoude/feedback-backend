const Joi = require("joi")

const signupSchema = Joi.object().keys({
  firstName: Joi.string().trim().lowercase().required(),
  lastName: Joi.string().trim().lowercase().required(),
  email: Joi.string().trim().lowercase().required(),
  phone: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{4,30}$/)
    .required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Password")
    .messages({ "any.only": "{{#label}} does not match" }),
  // confirm_password: Joi.ref("password")
  role: Joi.string().required(),
});


const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{4,30}$/)
    .required(),
});


const errorOptions = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

module.exports = {
  signupSchema,
  errorOptions,
  loginSchema,
};