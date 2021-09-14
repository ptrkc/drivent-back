import WebSocket, { Server }  from "ws";
import http from "http";
import { WSClient } from "@/interfaces/wsClient";

export async function connection(
  ws: WebSocket,
  req: http.IncomingMessage
) {
  const client = ws as unknown as WSClient;
  ws.on("pong", heartbeat);

  const requestedUpdate = req.url.replace("/updates?q=", "");
  client.isAlive = true;
  client.wantsRooms = false;
  client.wantsActivities = false;
  if (requestedUpdate === "rooms") {
    client.wantsRooms = true;
  } else if (requestedUpdate === "activities") {
    client.wantsActivities = true;
  } else {
    ws.close();
  }
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
  wss.clients.forEach(function each(ws) {
    const client = ws as unknown as WSClient;
    const now = Date.now();
    if (client.wantsRooms === true) {
      ws.send("New rooms on " + new Date(now));
    } else if (client.wantsActivities === true) {
      ws.send("New activities on " + new Date(now));
    }
  });
}
