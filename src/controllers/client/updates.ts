import http from "http";

export default async function updatesController(
  ws: WebSocket,
  req: http.IncomingMessage
) {
  const requestedUpdate = req.url.replace("/updates?q=", "");
  if (requestedUpdate === "rooms") {
    ws.send("so you want rooms");
  } else if (requestedUpdate === "activities") {
    ws.send("so you want some activities");
  } else {
    ws.send("bad request bruh");
    ws.close();
  }
}
