import { Router } from "express";

import * as controller from "@/controllers/client/booking";

const router = Router();

router.post("/", controller.post);
router.post("/:id/pay", controller.pay);

export default router;
