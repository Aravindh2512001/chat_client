import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "../pages/chat";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../pages/profile";
import { useStore } from "../store/store";

const AppRoutes = () => {
  
  const {user} = useStore()

  console.log("useruseruseruser  2",user)

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Chat />: <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile />: <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
