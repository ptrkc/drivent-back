import { Request, Response } from "express";

import * as service from "@/services/client/ticket";

export async function get(req: Request, res: Response) {
  const ticketsInfo = await service.getTicketsInfo();
  res.send(ticketsInfo);
}

export async function getAccommodation(req: Request, res: Response) {
  const accommodationsInfo = await service.getAccommodationsInfo();
  res.send(accommodationsInfo);
}
