import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/booking";

export interface Booking{
    userId: number;
    ticketInfo: TicketInfo;
}

interface TicketInfo {
  isOnline: boolean,
  hasHotel: boolean,
  price: number
}

export async function post(req: Request, res: Response) {
  const bookingInfo = req.body as Booking;
  const sendBooking = service.booking(bookingInfo);
  res.sendStatus(httpStatus.CREATED);
}
