import app, { init } from "@/app";
import http from "http";
import { Server } from "ws";

import * as wsFunctions from "./websocket";

const server = http.createServer(app);
const wss = new Server({ noServer: true, path: "/updates" });

wss.on("connection", wsFunctions.connection);

const pingInterval = setInterval(() => wsFunctions.ping(wss), 10000);
const updateInterval = setInterval(() => wsFunctions.sendUpdatedData(wss), 3000);

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
