import joi from "joi";

export default joi.object({
  isOnline: joi.boolean().required(),
  hasHotel: joi.boolean().required(),
  price: joi.number().required()
});
