import joi from "joi";

export default joi.object({
  userId: joi.number().min(1).required(),
  activitieId: joi.number().min(1).required(),
});
