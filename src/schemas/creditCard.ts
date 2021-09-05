import joi from "joi";

export default joi.object({
  name: joi.string().required(),
  cardNumber: joi.string().length(16).required(),
  expiry: joi.date().timestamp().required(),
  cvc: joi.string().length(3).required()
});
