import WebSocket, { Server }  from "ws";
import http from "http";
import jwt from "jsonwebtoken";

import { WSClient } from "@/interfaces/wsClient";
import * as hotelService from "@/services/client/hotel";
import * as activitiesService from "@/services/client/activities";
import UnauthorizedError from "@/errors/Unauthorized";

interface JwtPayload {
    userId: number
}

export async function connection(
  ws: WebSocket,
  req: http.IncomingMessage
) {
  const client = ws as unknown as WSClient;
  ws.binaryType = "arraybuffer";
  ws.on("pong", heartbeat);
  ws.on("message", (message) => tokenValidate(client, message));
  
  const requested = req.url.replace("/updates?q=", "");
  const requestedUpdate = requested.split("/")[0];

  client.isAlive = true;
  client.wantsRooms = false;
  client.wantsActivities = false;
  
  if (requestedUpdate === "rooms") {
    client.hotelId = Number(requested.split("/")[1]);
    client.wantsRooms = true;
  } else if (requestedUpdate === "activities") {
    client.wantsActivities = true;
  } else {
    ws.close();
  }
  sendDataOnce(ws, client);
}

function heartbeat() {
  this.isAlive = true;
}

export function ping(wss: Server) {
  wss.clients.forEach(function each(ws) {
    const client = ws as unknown as WSClient;
    if (client.isAlive === false) return ws.terminate();
    client.isAlive = false;
    ws.ping();
  });
}

export function sendUpdatedData(wss: Server) {
  wss.clients.forEach(async function each(ws) {
    const client = ws as unknown as WSClient;
    sendDataOnce(ws, client);
  });
}

async function sendDataOnce(ws: WebSocket, client: WSClient) {
  if (client.wantsRooms === true) {
    const userId = client.userId;
    const hotelId = client.hotelId;
    const hotelRooms = await hotelService.getHotelRooms(hotelId, userId);
    const stringfiedHotelRooms = JSON.stringify(hotelRooms);
    ws.send(stringfiedHotelRooms);
  } else if (client.wantsActivities === true) {
    const activities = await activitiesService.getActivities();
    const stringfiedActivities = JSON.stringify(activities);
    ws.send(stringfiedActivities);
  }
}

async function tokenValidate(client: WSClient, message: WebSocket.Data) {
  const token = message.toLocaleString().replace(/['"]+/g, "");
  if (!token) {
    throw new UnauthorizedError();
  } 
  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as unknown as JwtPayload;
  client.userId = userId;
}
