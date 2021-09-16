import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";
import { ActivitieEnrollment } from "@/interfaces/activitieEnrollment";

export async function getActivities(req: Request, res: Response) {
  const activities = await service.getActivities();
  if(!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.status(httpStatus.OK).send(activities);
}

export async function enrollUser(req: Request, res: Response) {
  const enrollmentData = req.body as ActivitieEnrollment;

  const activities = await service.enrollUser(enrollmentData);
  if(!activities) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  res.status(httpStatus.CREATED).send(activities);
}

export async function disenrollUser(req: Request, res: Response) {
  const enrollmentData = req.body as ActivitieEnrollment;

  const activities = await service.disenrollUser(enrollmentData);
  if(!activities) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  res.status(httpStatus.OK).send(activities);
}
