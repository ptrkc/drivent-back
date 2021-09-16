import joi from "joi";

const bookingSchema = joi.object({
  isOnline: joi.boolean().required(),
  hasHotel: joi.boolean().required(),
  price: joi.number().required()
});

const bookingRoomSchema = joi.object({
  roomId: joi.number().required()
});

export { bookingSchema, bookingRoomSchema };
