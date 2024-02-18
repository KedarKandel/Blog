import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/store";
import { showToast } from "../redux/reducers/toastSlice";
import { useState } from "react";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const actionResult = await dispatch(registerUserAsync(data));
    console.log(actionResult)

    if (registerUserAsync.rejected.match(actionResult)) {
      setError(
        actionResult.error.message || "An error occured during registration"
      );
    } else {
      // reset the form
      reset();
      navigate("/");
      dispatch(showToast("Registration successful"))
    }
  });
  return (
    <form
      className=" container rounded-md shadow-lg p-2 xl:mx-80 flex flex-col"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl mb-5 font-bold">Create An Account</h1>
      <div className="mb-4">
        <label htmlFor="FirstName" className="block font-semibold">
          First Name
          <input
            type="text"
            placeholder="First Name"
            className="mt-1 px-2 py-3 w-full rounded-md"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="LastName" className="block font-semibold">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            className="mt-1 px-2 py-3  w-full rounded-md"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 mt-1">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold">
          Email
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 px-2 py-3  w-full rounded-md"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-semibold">
          Password
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-1 px-2 py-3  w-full rounded-md"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be atleast 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block font-semibold ">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm your password"
            className="mt-1 px-2 py-3  w-full rounded-md"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required";
                } else if (watch("password") !== value) {
                  return "Your password do not match!";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      {error && <span className=" text-sm text-red-500 m-2">{error}</span>}
      <div className=" flex md:justify-between items-center gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-400 transition-colors duration-300 w-fit"
        >
          Register
        </button>
        <Link to={"/sign-in"} className=" text-sm md:text-lg">
          Already registered ? <span className=" underline">Sign in here</span>{" "}
        </Link>
      </div>
    </form>
  );
};

export default Register;
