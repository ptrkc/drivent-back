import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/booking";

export interface Booking {
  userId: number;
  ticketInfo: TicketInfo;
}

interface TicketInfo {
  isOnline: boolean,
  hasHotel: boolean,
  price: number
}

export interface PaymentInfo {
  name: string;
  cardNumber: string;
  expiry: Date;
  cvc: string;
}

export async function post(req: Request, res: Response) {
  const bookingInfo = req.body as Booking;
  const sendBooking = service.booking(bookingInfo);
  res.sendStatus(httpStatus.CREATED);
}

export async function pay(req: Request, res: Response) {
  const paymentInfo = req.body as PaymentInfo;
  const id = Number(req.params.id);
  const validate = await service.validateCard(paymentInfo);
  if (!validate) return res.sendStatus(httpStatus.BAD_REQUEST);

  const payment = await service.pay(id);
  if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

  res.sendStatus(httpStatus.OK);
}
