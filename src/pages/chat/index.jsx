import { useEffect } from "react";
import { useStore } from "../../store/store";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import ChatSidebar from "./components/ChatSidebar";
import MessageContainer from "./components/MessageContainer";
import { socket } from "../../utils/socket";
import EmptyChat from "./components/EmptyChat";

const Chat = () => {
  const { initSocket, user, selectedUser } = useStore();

  useEffect(() => {
    if (!user?._id) {
      console.error("User not logged in or user id is missing.");
      return;
    }
    console.log("userLoged in");
    initSocket();

    return () => {
      socket.disconnect();
    };
  }, [initSocket, user]);

  return (
    <div className="w-screen flex flex-col h-[91vh] mt-[4rem] bg-gray-800">
      <div className="flex-1 rounded-xl bg-gray-700 p-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Sidebar */}
          <div className="lg:col-span-3 md:col-span-5 col-span-12 bg-gray-800 p-4 rounded-lg">
            <ChatSidebar />
          </div>

          {selectedUser ? (
            <div className="lg:col-span-9 md:col-span-7 col-span-12 bg-gray-800  rounded-lg flex flex-col">
              <ChatHeader />
              <div className="flex flex-col">
                <MessageContainer />
              </div>
              <ChatFooter />
            </div>
          ) : (
            <div className="lg:col-span-9 md:col-span-7 col-span-12 bg-gray-800  rounded-lg flex flex-col">
                <EmptyChat/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
