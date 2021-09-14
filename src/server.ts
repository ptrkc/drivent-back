import app, { init } from "@/app";
import http from "http";
import { Server } from "ws";

import updatesController from "./controllers/client/updates";

const server = http.createServer(app);
const wss = new Server({ noServer: true, path: "/updates" });

wss.on("connection", updatesController);

function heartbeat() {
  this.isAlive = true;
  console.log("still alive");
}

wss.on("connection", function connection(ws) {
  const client = ws as unknown as WSClient;
  client.isAlive = true;
  ws.on("pong", heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    const client = ws as unknown as WSClient;
    if (client.isAlive === false) return ws.terminate();
    client.isAlive = false;
    ws.ping();
  });
}, 5000);

wss.on("close", function close() {
  clearInterval(interval);
});

server.on("upgrade", function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});

const port = +process.env.PORT || 4000;

init().then(() => {
  server.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
