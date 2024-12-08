import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import { GET_MESSAGE } from "@api/endPoints";

const MessageContainer = () => {
  const { messages, user, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useStore();

  const { isError, isLoading, error } = useQuery({
    queryKey: ["Message", selectedUser?._id],
    queryFn: async () => {
      const response = await apiClient.get(`${GET_MESSAGE}/${selectedUser._id}`);
      return response.data;
    },
    enabled: !!selectedUser?._id,
  });

  useEffect(() => {
    if (selectedUser) {
      subscribeToMessages(); 
    }
    return () => unsubscribeFromMessages(); 
  }, [subscribeToMessages, unsubscribeFromMessages, selectedUser]);

  if (isLoading) return <div>Loading messages...</div>;
  if (isError) return <div>Error fetching messages: {error.message}</div>;

  return (
    <div className="flex-1 bg-gray-800 w-full h-full overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message._id} className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={message.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              />
            </div>
          </div>
          <div className="chat-bubble text-sm">{message.text}</div>
          <div className="chat-footer opacity-50">
            <time className="text-xs">{new Date(message.createdAt).toLocaleTimeString()}</time>
          </div>
        </div>
      ))}
    </div>
  );
};


export default MessageContainer;
