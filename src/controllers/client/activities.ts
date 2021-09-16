import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";
import { ActivitieEnrollment } from "@/interfaces/activitieEnrollment";

export async function getActivities(req: Request, res: Response) {
  const activities = await service.getActivities();
  if(!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(activities).status(httpStatus.OK);
}

export async function enrollUser(req: Request, res: Response) {
  const enrollmentData = req.body as ActivitieEnrollment;

  const enrollmentDone = await service.enrollUser(enrollmentData);
  if(!enrollmentDone) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  res.sendStatus(httpStatus.CREATED);
}
