import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "../pages/chat";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../pages/profile";
import { useStore } from "../store/store";

const AppRoutes = ({authToken}) => {
  
  const {user,isLoggedIn} = useStore()

  console.log("useruseruseruser  2",user)

  return (
    <>
      <Routes>
      {/* Chat Route - if user and authToken exist, render Chat, else redirect to Login */}
      <Route path="/" element={isLoggedIn && authToken ? <Chat /> : <Navigate to="/login" />} />

      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Register Route */}
      <Route path="/register" element={<Register />} />

      {/* Profile Route - if user and authToken exist, render Profile, else redirect to Login */}
      <Route path="/profile" element={isLoggedIn && authToken ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
    </>
  );
};

export default AppRoutes;
