import {
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import AuthImagePattern from "./AuthImagePattern";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api";
import { LOGIN } from "@api/endpoints";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useStore } from "../store/store";

const Login = () => {
  const { register, handleSubmit ,reset} = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useStore()
  const navigate = useNavigate();


  // login
  const loginMutation = useMutation({
    mutationFn: async (data) =>
      apiClient.post(LOGIN, data).then((res) => {
        return res.data;
      }),
    onSuccess: (data) => {
      login(data?.user,data?.token)
      navigate("/profile")
      reset()
      toast.success(data?.message);
    },
    onError: (error) => {
      const errorMessage =
            error?.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
    },
  });


  
  
  const onSubmit = async (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-screen h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center gap-10 p-6">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="border border-primary p-4 rounded-lg shadow-lg bg-base-200">
            <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-primary animate-bounce" />
          </div>
          <div>
            <h1 className="text-5xl font-extrabold mt-4 text-center">
              Hello, Gorgeous! 💃
            </h1>
            <p className="text-base-content/60 text-center mt-2">
              Log in, light up the room, and let’s make sparks fly! ✨
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center justify-center gap-5 w-3/6 mx-auto">
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center w-full shadow-sm">
                <EnvelopeIcon className="w-6 h-6 text-primary" />
                <input
                  type="email"
                  className="grow focus:outline-none bg-transparent ml-2 rounded-xl"
                  placeholder="Your dazzling email ✉️"
                  {...register("email", { required: "Email is required" })}
                />
              </label>
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center w-full shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow focus:outline-none bg-transparent mr-2 rounded-xl"
                  placeholder="Your secret pass to fabulous 💎"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6 text-primary hover:text-secondary" />
                  ) : (
                    <EyeIcon className="w-6 h-6 text-primary hover:text-secondary" />
                  )}
                </div>
              </label>
            </div>

            <p className="text-base-content/80">
              New here?
              <span
                className="text-primary font-bold underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Let’s create some magic!
              </span>
            </p>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full shadow-lg">
              🚀 Sparkle and Shine!
            </button>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        subtitle={
          <div className="flex items-center justify-center gap-1">
            Join the fun, charm the world, and chat with style!
            <ChatBubbleOvalLeftEllipsisIcon className="inline w-6 h-6 text-primary" />
          </div>
        }
        title="Welcome Back, Stunner!"
      />
    </div>
  );
};

export default Login;
