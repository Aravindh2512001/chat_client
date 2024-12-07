import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Approutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "./common/components/Navbar";
import { useStore } from "./store/store";
import { useEffect } from "react";

export default function App() {
  const queryClient = new QueryClient();
  const { theme, checkAuth } = useStore();

  useEffect(() => {
    checkAuth();  
  }, [checkAuth]);

  return (
    <div data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Router>
          <AppRoutes />
          <Toaster position="top-center" />
        </Router>
      </QueryClientProvider>
    </div>
  );
}
