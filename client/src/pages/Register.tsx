import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    // <div className="container m-2 flex items-center justify-center">
    <form
      className=" container rounded-md shadow-md p-2 md:mx-80  flex flex-col"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl mb-5 font-bold">Create an account</h1>
      <div className="mb-4">
        <label htmlFor="FirstName" className="block">
          First Name
          <input
            type="text"
            placeholder="First Name"
            className="mt-1 p-2 w-full rounded-md"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="LastName" className="block">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            className="mt-1 p-2 w-full rounded-md"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 mt-1">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block">
          Email
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-1 p-2 w-full rounded-md"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block ">
          Password
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-1 p-2 w-full rounded-md"
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
        <label htmlFor="confirmPassword" className="block ">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm your password"
            className="mt-1 p-2 w-full rounded-md"
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
      <div className=" flex md:justify-between items-center">
        <button
          type="submit"
          className="bg-white text-red-500 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-300 w-fit"
        >
          Register
        </button>
        <Link to={"/sign-in"} className=" text-sm md:text-lg">
          Already registered ? <span className=" underline">Sign in here</span>{" "}
        </Link>
      </div>
    </form>
    // </div>
  );
};

export default Register;
