import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/activities";

export async function getActivities(req: Request, res: Response) {
  const activities = await service.getActivities();
  if(!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  res.send(activities).status(httpStatus.OK);
}
