import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/:hotelId/rooms", controller.getRooms);

export default router;
