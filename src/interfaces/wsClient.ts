export interface WSClient extends WebSocket {
  isAlive: boolean;
  wantsRooms: boolean;
  wantsActivities: boolean;
}
