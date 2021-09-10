import { Router } from "express";

import * as controller from "@/controllers/client/booking";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import bookingSchema from "@/schemas/bookingSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(bookingSchema), controller.post);
router.get("/", controller.get);
router.post("/:id/pay", controller.pay);

export default router;
