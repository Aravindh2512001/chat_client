import { useEffect, useState } from "react";
import Select from "react-select";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store/store";
import { apiClient } from "../../../api";
import { GET_USERS } from "@api/endPoints";

const ChatSidebar = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user ,setSelectedUser,selectedUser} = useStore();

  // Fetch users based on the search term
  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm.trim()) {
        setUserList([]);
        return;
      }
      try {
        const response = await apiClient.get(`${GET_USERS}?search=${searchTerm}`);
        setUserList(response?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchTerm]);


  // Handle user selection
  const handleUserSelection = (selectedOption) => {
    setSelectedUser(selectedOption?.user);
  };
  console.log("Selected User:", selectedUser);

  // Handle search input change
  const handleSearchInput = (inputValue) => {
    setSearchTerm(inputValue);
  };

  // Map users to dropdown options
  const userOptions = userList.map((user) => ({
    label: user?.username || "Unknown User",
    value: user?._id || "",
    user,
  }));

  // Custom styles for the Select dropdown
  const dropdownStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "8px",
      borderColor: "#ddd",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#bbb",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    option: (base, state) => ({
      ...base,
      color: "#000",
      backgroundColor: state.isSelected ? "#bfe3fd" : "transparent",
      padding: "10px 15px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#e0f7ff",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
    }),
    input: (base) => ({
      ...base,
      color: "#333",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#999",
    }),
  };

  return (
    <div className="flex flex-col gap-4">
      {/* User Profile Section */}
      <div className="flex items-center justify-between border-b border-gray-600 pb-2">
        <div className="flex items-center">
          <div className="avatar w-1/3">
            <img
              className="rounded-full"
              src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="User Avatar"
            />
          </div>
          <div className="flex flex-col ml-3">
            <p className="text-primary">{user?.username || "Anonymous"}</p>
            <p className="text-secondary">{user?.email || "No Email Available"}</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Search Contact Section */}
      <div className="flex flex-col">
        <p className="mb-2">Search Contact</p>
        <Select
          options={userOptions}
          onInputChange={handleSearchInput}
          onChange={handleUserSelection}
          inputValue={searchTerm}
          placeholder="Search users..."
          className="w-full"
          styles={dropdownStyles}
        />
      </div>
    </div>
  );
};

export default ChatSidebar;
