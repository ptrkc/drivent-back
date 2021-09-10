import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function getRooms(req: Request, res: Response) {
  const hotelId = Number(req.params);
  const hotelRooms = await service.getHotelRooms(hotelId);
  res.send(hotelRooms);
}
