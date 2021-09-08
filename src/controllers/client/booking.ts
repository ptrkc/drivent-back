import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/booking";

export interface Booking{
  isOnline: boolean,
  hasHotel: boolean,
  price: number
}

export async function post(req: Request, res: Response) {
  const userId = req.user.id;
  const bookingInfo = req.body as Booking;
  await service.booking(bookingInfo, userId);
  res.sendStatus(httpStatus.CREATED);
}

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const bookingDetails = await service.getBookingDetails(userId);
  if(!bookingDetails) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  res.send(bookingDetails).status(httpStatus.OK);
}
