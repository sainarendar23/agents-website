const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

const validatePayment = (req, res, next) => {
  const schema = Joi.object({
    agents: Joi.array().items(Joi.string().uuid()).min(1).required(),
    plan: Joi.string().uuid().required(),
    total: Joi.number().min(0).required(),
    cardDetails: Joi.object({
      cardNumber: Joi.string().length(16).required(),
      expiryDate: Joi.string().pattern(/^\d{2}\/\d{2}$/).required(),
      cvv: Joi.string().min(3).max(4).required(),
      cardholderName: Joi.string().min(2).max(255).required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePayment
};