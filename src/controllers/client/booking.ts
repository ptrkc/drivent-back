import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/booking";
import Booking from "@/interfaces/booking";
import { PaymentInfo } from "@/interfaces/payment";

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

export async function pay(req: Request, res: Response) {
  const paymentInfo = req.body as PaymentInfo;
  const id = Number(req.params.id);
  const validate = await service.validateCard(paymentInfo);
  if (!validate) return res.sendStatus(httpStatus.BAD_REQUEST);

  const payment = await service.pay(id);
  if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

  res.sendStatus(httpStatus.OK);
}
