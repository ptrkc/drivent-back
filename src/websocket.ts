import WebSocket, { Server }  from "ws";
import http from "http";
import { WSClient } from "@/interfaces/wsClient";
import * as service from "@/services/client/hotel";

export async function connection(
  ws: WebSocket,
  req: http.IncomingMessage
) {
  const client = ws as unknown as WSClient;
  ws.on("pong", heartbeat);
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
    const userId = 5;
    const hotelId = client.hotelId;
    const hotelRooms = await service.getHotelRooms(hotelId, userId);
    const stringfiedHotelRooms = JSON.stringify(hotelRooms);
    ws.send(stringfiedHotelRooms);
  } else if (client.wantsActivities === true) {
    ws.send("New activities on now");
  }
}
