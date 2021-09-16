import { Router } from "express";

import * as controller from "@/controllers/client/activities";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import activitieEnrollmentSchema from "@/schemas/activityEnrollmentSchema";

const router = Router();

router.get("/", controller.getActivities);
router.post("/", schemaValidatingMiddleware(activitieEnrollmentSchema), controller.enrollUser);

export default router;
