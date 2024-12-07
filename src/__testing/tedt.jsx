import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";

const fetchUsers = async (searchTerm) => {
  if (!searchTerm) return [];
  const response = await axios.get("http://localhost:5000/message/users", {
    params: { search: searchTerm },
  });
  return response.data.user;
};

const ChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: filteredUsers = [] } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
    enabled: !!searchTerm,
  });

  // console.log("filteredUsers", filteredUsers);

  const handleSearchChange = (newValue) => {
    // console.log("newValuenewValue", newValue);
    setSearchTerm(newValue);
  };

  const selectOptions = filteredUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  return (
    <div className="w-1/4 h-full overflow-y-auto bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="flex items-center justify-center mb-4">
        <Select
          options={selectOptions}
          onInputChange={handleSearchChange}
          inputValue={searchTerm}
          placeholder="Search users..."
          className="w-full"
          menuIsOpen={searchTerm && filteredUsers.length > 0} 
        />
      </div>
      <div
        key="sk"
        className="flex items-center p-2 mb-2 bg-white rounded-lg shadow-md"
      >
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/d95c1f148207527.62d1246c25004.jpg"
          alt="baby"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-sm font-medium">baby</p>
          <p className="text-xs text-gray-500">hru?? okie</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
