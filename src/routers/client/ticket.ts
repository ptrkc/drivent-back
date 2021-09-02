import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/", controller.get);
router.get("/accommodation", controller.getAccommodation);

export default router;
