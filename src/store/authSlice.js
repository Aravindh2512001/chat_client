import { CHECK_AUTH } from "@api/endPoints";
import { apiClient } from "../api";
import { socket } from "../utils/socket";

export const authSlice = (set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  isProfileUpdated: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await apiClient.get(CHECK_AUTH, { withCredentials: true });
      console.log("Auth response:", res);
      if (res.data) {
        set({
          user: res.data,
          isLoggedIn: true,
        });
        // Connect socket after successful authentication
        socket.io.opts.query = { userId: res.data._id };
        socket.connect();
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ user: null, isLoggedIn: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: (user, token) => {
    set({
      isLoggedIn: true,
      user: user,
      token: token,
    });
    // Connect socket after login
    socket.io.opts.query = { userId: user._id };
    socket.connect();
  },

  profileUpdate: (value) =>
    set({
      isProfileUpdated: true,
      user: value,
    }),

  logout: async () => {
    // Disconnect socket on logout
    socket.disconnect();
    set({
      isLoggedIn: false,
      user: null,
      token: null,
      isProfileUpdated: false,
    });
  },
});
