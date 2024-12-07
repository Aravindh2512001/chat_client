import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { useStore } from "../../store/store";
import { apiClient } from "../../api";
import {useNavigate} from "react-router-dom";
import { PROFILE_UPDATE } from "@api/endPoints";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const inputRef = useRef();
  const navigate = useNavigate()
  const { user,profileUpdate } = useStore(); 
  const [avatar, setAvatar] = useState(user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp");
  
    const profileMutation = useMutation({
      mutationFn: async (data) => {
        return apiClient.put(`${PROFILE_UPDATE}/${user.id}`, { image: avatar, username: data.username })
        .then((res) => res.data);
      },
      onSuccess: (data) => {
        console.log({data})
        profileUpdate(data.user);
        navigate("/")
        toast.success(data?.message || "Profile updated successfully!");
      },
      onError: (error) => {
        console.error("Profile update error:", error);
        const errorMessage = error?.response?.data?.message || "Profile update failed. Please try again.";
        toast.error(errorMessage);
      },
    });

  if (!user) {
    return <div>Loading...</div>; 
  }

  console.log("profileUser",user) 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB limit
      if (file.size > maxSize) {
        toast.error("File size too large. Please upload an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  // Handle form submit
  const onSubmit = (data) => {
    profileMutation.mutate(data);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="lg:w-1/3 md:w-1/2 sm:w-3/4 w-full mx-auto p-6 shadow-lg rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeftIcon className="w-6 h-6 text-gray-500 cursor-pointer hover:text-primary" />
          <h2 className="text-lg font-semibold text-gray-500">
            Update Your Profile
          </h2>
        </div>

        {/* Avatar Section */}
        <div className="flex justify-center relative mb-8">
          <div className="w-28 h-28 rounded-full relative overflow-visible">
            <div className="ring ring-primary ring-offset-2 w-full h-full rounded-full">
              <img
                src={user.avatar|| avatar}
                alt="avatar"
                className="rounded-full object-cover w-full h-full"
              />
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <div
              className="absolute bottom-0 right-0 p-2 rounded-full shadow-md cursor-pointer bg-gray-100"
              onClick={() => inputRef.current.click()}
              style={{ zIndex: 10 }}
            >
              <CameraIcon className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter your name"
              defaultValue={user?.username || ""}
              {...register("username", { required: true })}
              className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-xl hover:bg-primary-focus"
              disabled={profileMutation.isLoading}
            >
              {profileMutation.isLoading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
