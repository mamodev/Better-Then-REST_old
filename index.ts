import { ServerWebSocket } from "bun";
import z from "zod";
import { loadConfiguration } from "./config.js";
import { SequentialCounter } from "./src/mutex.js";

await loadConfiguration();

function infoLog(str: string) {
  console.log(str);
}
const socketIds = new SequentialCounter();

type SocketContext = {
  socketId: number;
  token: string | null;
};

enum SocketRequestType {
  Entity = 0,
  RPC = 1,
}

type SocketRequestArgs = Record<string, boolean | string | number>;

type SocketRequest = {
  id: number;
  res: string;
  type: SocketRequestType;
  args: SocketRequestArgs;
};

type SocketResponse<T = any> = {
  id: number;
  error: boolean;
  data: T;
};

const FORMAT_ERROR = (id: number) => ({
  id,
  error: true,
  data: {
    msg: "Invalid socket response format",
  },
});

Bun.serve({
  fetch(req, server) {
    if (
      server.upgrade(req, {
        data: {
          socketId: socketIds.getNext(),
          token: null,
        },
      })
    ) {
      return;
    }
    return new Response("Upgrade failed.", { status: 500 });
  },
  port: 8888,

  websocket: {
    message(ws: ServerWebSocket<SocketContext>, message) {
      if (typeof message != "string") ws.send(JSON.stringify(FORMAT_ERROR));

      const unsafe_data = JSON.stringify(message);

      const data = z
        .object({
          id: z.number(),
          res: z.string(),
          type: z.number(),
          args: z.unknown(),
        })
        .parse(unsafe_data);
      ws.send(message);
    }, // a message is received
    open() {
      infoLog(`New connection from ws`);
    }, // a socket is opened
    close() {
      infoLog(`Connection closed`);
    }, // a socket is closed
  },
});
