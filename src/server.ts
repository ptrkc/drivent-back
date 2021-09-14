import app, { init } from "@/app";
import http from "http";
import WebSocket, { Server } from "ws";

const server = http.createServer(app);
const wss = new Server({ noServer: true, path: "/updates" });

wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
  const requestedUpdate = req.url.replace("/updates?q=", "");
  //send immediatly a feedback to the incoming connection
  if (requestedUpdate === "rooms") {
    ws.send("so you want rooms");
  } else if (requestedUpdate === "activities") {
    ws.send("so you want some activities");
  } else {
    ws.send("bad request bruh");
    ws.close();
  }
});

// wss.on("close", function close() {
//   clearInterval(interval);
// });

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
