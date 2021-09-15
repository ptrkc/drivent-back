import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/hotel";

export async function getHotels(req: Request, res: Response) {
  const hotels = await service.getHotels();
  res.send(hotels).status(httpStatus.OK);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const hotelRooms = await service.getHotelRooms(hotelId);
  if(!hotelRooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  res.send(hotelRooms).status(httpStatus.OK);
}
