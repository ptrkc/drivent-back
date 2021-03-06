import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import ticketRouter from "@/routers/client/ticket";
import bookingRouter from "@/routers/client/booking";
import hotelRouter from "@/routers/client/hotel";
import activitiesRouter from "@/routers/client/activities";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/tickets", tokenValidationMiddleware, ticketRouter);
router.use("/booking", tokenValidationMiddleware, bookingRouter);
router.use("/hotel", tokenValidationMiddleware, hotelRouter);
router.use("/activities", tokenValidationMiddleware, activitiesRouter);

export default router;
