import { Router } from "express";

import * as controller from "@/controllers/client/booking";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import { bookingSchema, bookingRoomSchema } from "@/schemas/bookingSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(bookingSchema), controller.post);
router.post("/room", schemaValidatingMiddleware(bookingRoomSchema), controller.addRoom);
router.get("/", controller.get);
router.post("/:id/pay", controller.pay);

export default router;
