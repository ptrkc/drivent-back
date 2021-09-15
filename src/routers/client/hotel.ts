import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/:hotelId/rooms", controller.getRooms);
router.get("/", controller.getHotels);

export default router;
