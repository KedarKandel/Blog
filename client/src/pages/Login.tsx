import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" container  flex items-center justify-center">
      <form className="p-8 rounded-md shadow-md w-full max-w-md flex flex-col">
        <h1 className=" text-2xl text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold">
            Email
            <input
              type="text"
              placeholder="Enter your email"
              className="mt-1 p-2 w-full rounded-md font-thin"
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
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-white text-green-800 py-2 px-4 mb-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          Login
        </button>
        <Link to={"/register"} className="md:w-full w-52">Don't have an account? <span className=" text-red-500 md:ms-24">Register here</span></Link>
      </form>
    </div>
  );
};

export default Login;
