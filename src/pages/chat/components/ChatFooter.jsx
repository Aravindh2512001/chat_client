import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store/store";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import { SEND_MESSAGE } from "@api/endPoints";

const ChatFooter = () => {
  const { user, selectedUser, sendMessage } = useStore();
  const [message, setMessage] = useState("");

  const handleSendMessage = useMutation({
    mutationKey: ["Message"],
    mutationFn: async () => {
      if (!user._id || !selectedUser._id) {
        throw new Error("Invalid user or receiver information.");
      }
      const { data } = await apiClient.post(SEND_MESSAGE, {
        senderId: user._id,
        receiverId: selectedUser._id,
        text: message,
      });
      console.log("data.newMessage", data.newMessage);
      return data.newMessage;
    },
    onSuccess: (newMessage) => {
      console.log("newMessage", newMessage);
      sendMessage(newMessage);
      setMessage("");
    },
    onError: (error) => console.error("Error sending message:", error),
  });

  const handleSend = () => {
    if (message.trim()) {
      handleSendMessage.mutate();
    }
  };

  return (
    <div className="bg-gray-800 p-3 rounded-b-lg flex items-center gap-2">
      <button className="p-2 text-gray-100">
        <FaceSmileIcon className="size-6" />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 rounded-lg bg-gray-700 text-white"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="p-2 text-white bg-primary" onClick={handleSend}>
        <PaperAirplaneIcon className="size-6" />
      </button>
    </div>
  );
};

export default ChatFooter;
