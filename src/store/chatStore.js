// In frontend (chat store)
import { socket } from "../utils/socket";

export const useChatStore = (set, get) => ({
  messages: [],
  onlineUsers: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,

  // Initialize socket connection
  initSocket: () => {
    const user = get().user;
    if (!user?._id) {
      console.error("User not logged in.");
      return;
    }

    socket.io.opts.query = { userId: user._id };
    socket.connect();

    socket.on("connect", () => console.log("Socket connected:", socket.id));

    // Handle new incoming messages
    socket.on("new_message", (msg) => {
      console.log("New message received:", msg);
      set((state) => {
        // Prevent adding duplicate messages
        if (!state.messages.some((message) => message._id === msg._id)) {
          return { messages: [...state.messages, msg] };
        }
        return state;
      });
    });

    // Handle online users update
    socket.on("online_users", (users) => {
      console.log("onlineUsers", users);
      set({ onlineUsers: users });
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  },

  // Send a message
  sendMessage: (message) => {
    if (socket.connected) {
      socket.emit("send_message", message); // Emit the message to the backend
      set((state) => ({ messages: [...state.messages, message] }));
    } else {
      console.error("Socket is not connected.");
    }
  },

  // Other methods (subscribe, unsubscribe, etc.)
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    socket.on("new_message", (msg) => {
      console.log("New message received:", msg);
      set((state) => ({ messages: [...state.messages, msg] }));
    });
  },

  unsubscribeFromMessages: () => {
    socket.off("new_message");
  },

  disconnectSocket: () => {
    socket.disconnect();
    set({ messages: [], onlineUsers: [] });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
    localStorage.setItem("selectedUser", JSON.stringify(user));
  },

  clearSelectedUser: () => {
    set({ selectedUser: null });
    localStorage.removeItem("selectedUser");
  },
});
