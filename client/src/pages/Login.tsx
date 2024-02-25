import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { loginUserAsync } from "../redux/reducers/userSlice";
import { showToast } from "../redux/reducers/toastSlice";
import * as apiClient from "../api-client";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, reset, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = handleSubmit(async (data) => {
    
    try {
      const actionResult = await dispatch(loginUserAsync(data));
      if (loginUserAsync.rejected.match(actionResult)) {
        // If the login request is rejected, set the error state

        dispatch(
          showToast({
            message:
              actionResult.error.message || "An error occurred during login.",
            type: "error",
          })
        );
      } else {
        reset();
        navigate("/");
        dispatch(showToast({ message: "Login successful", type: "success" }));
        // Validate token after successful login
        await apiClient.validateToken();
      }
    } catch (error) {
      // Handle any unexpected errors
      dispatch(
        showToast({
          message: "An unexpected error occured during login",
          type: "error",
        })
      );
      console.error("An unexpected error occurred during login:", error);
    }
  });

  return (
    <div className=" container  flex items-center justify-center">
      <form
        className="p-8 rounded-md shadow-md w-full max-w-md flex flex-col"
        onSubmit={onSubmit}
      >
        <h1 className=" text-2xl text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold">
            Email
            <input
              type="text"
              placeholder="Enter your email"
              className="mt-1 p-2 w-full rounded-md font-thin"
              {...register("email", { required: "email is required" })}
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold ">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 p-2 w-full rounded-md font-thin"
              {...register("password", {
                required: "Password with 6 or more characters required",
              })}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-white text-green-800 py-2 px-4 mb-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          Login
        </button>
        <Link to={"/register"} className="md:w-full w-52">
          Don't have an account?{" "}
          <span className=" text-red-500 md:ms-24">Register here</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
