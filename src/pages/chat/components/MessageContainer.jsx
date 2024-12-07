import { useEffect } from "react";
import { useStore } from "../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import { GET_MESSAGE } from "../../../api/endpoints";

const MessageContainer = () => {
  const { user, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useStore();


  

  console.log("selectedUser._id",selectedUser)
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Message", selectedUser?._id],


    queryFn: async () => {
      const response = await apiClient.get(`${GET_MESSAGE}/${selectedUser._id}`);
      return response.data;
    },
    enabled: !!selectedUser?._id,
  });

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  if (isLoading) return <div>Loading messages...</div>;
  if (isError) return <div>Error fetching messages: {error.message}</div>;

  return (
    <div className="flex-1 bg-gray-800 w-full h-full overflow-auto p-4">
      {data?.messages.map((message) => (
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
