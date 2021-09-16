import joi from "joi";

export default joi.object({
  userId: joi.number().min(1).required(),
  activityId: joi.number().min(1).required(),
});
