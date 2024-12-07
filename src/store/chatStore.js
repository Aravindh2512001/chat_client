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
    socket.on("send_message", (msg) => {
      console.log("Message sent to the server:", msg);
      set((state) => ({ messages: [...state.messages, msg] }));
    });

    socket.on("new_message", (msg) => {
      console.log("New message received:", msg);
      set((state) => ({ messages: [...state.messages, msg] }));
    });

    socket.on("online_users", (users) => {
      console.log("onlineUsers", users);
      set({ onlineUsers: users });
    });

    socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
  },

  // Subscribe to incoming messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    socket.on("new_message", (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        set((state) => ({ messages: [...state.messages, newMessage] }));
      }
    });
  },

  // Unsubscribe from incoming messages
  unsubscribeFromMessages: () => {
    socket.off("new_message");
  },

  // Disconnect socket and clear messages
  disconnectSocket: () => {
    socket.disconnect();
    set({ messages: [], onlineUsers: [] });
  },

  // Set the selected user
  setSelectedUser: (user) => {
    set({ selectedUser: user });
    localStorage.setItem("selectedUser", JSON.stringify(user));
  },

  // Clear selected user
  clearSelectedUser: () => {
    set({ selectedUser: null });
    localStorage.removeItem("selectedUser");
  },

  // Send a message
  sendMessage: (message) => {
  console.log("Sending message:", message);
  if (socket.connected) {
    socket.emit("send_message", message);
    set((state) => ({ messages: [...state.messages, message] }));
  } else {
    console.error("Socket is not connected.");
  }
},

});
