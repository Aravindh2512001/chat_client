import { XMarkIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store/store";

const ChatHeader = () => {
  const { selectedUser, clearSelectedUser } = useStore();

  return (
    <div className="w-full flex justify-between items-center bg-gray-800 p-4 border-b border-gray-600 rounded-t-lg rounded-tr-lg">
      <div className="flex items-center justify-between">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={selectedUser.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
          </div>
        </div>
        <div className="flex flex-col ml-3">
          <p className="text-primary">{selectedUser?.username || "ahi"}</p>
          <p className="text-primary">{selectedUser?.email || "ahi"}</p>
        </div>
      </div>
      <div className="">
        <p className="btn btn-accent p-2 h-1" onClick={clearSelectedUser}>
          <XMarkIcon className="size-6 text-black"/>
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
