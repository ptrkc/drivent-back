import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/hotel";

export async function getRooms(req: Request, res: Response) {
  const userId = req.user.id;
  const hotelId = Number(req.params.hotelId);
  const hotelRooms = await service.getHotelRooms(hotelId, userId);
  if(!hotelRooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  res.send(hotelRooms).status(httpStatus.OK);
}
