import { Router } from "express";

import * as controller from "@/controllers/client/booking";

const router = Router();

router.post("/", controller.post);

export default router;
