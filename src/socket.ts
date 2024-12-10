import { Server as SocketIOServer, Socket } from "socket.io";

// Define the event interfaces
interface ServerToClientEvents {
  newMessage: (data: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
}

// Setup Socket.IO
export const setupSocketIO = (io: SocketIOServer) => {
  io.on(
    "connect",
    (
      socket: Socket<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >
    ) => {
      console.log("A user connected");

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });

      // Add your custom event handlers here
      socket.on("sendMessage", (data) => {
        console.log("hello");
        console.log("Message received:", data);
        io.emit("newMessage", data); // Broadcast the message to all connected clients
      });
    }
  );
};
