import { io } from "socket.io-client";

const SocketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const socket = io(SocketUrl, {
    reconnection: true,
    transports: ["websocket", "polling"], 
});

