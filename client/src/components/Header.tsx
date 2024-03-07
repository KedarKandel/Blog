import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUserAsync } from "../redux/reducers/userSlice";
import { showToast } from "../redux/reducers/toastSlice";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    dispatch(
      showToast({ message: "Logged out successfully", type: "success" })
    );
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* mobile sidebar */}
      <div
        className={`fixed bg-blue-800 top-0 bottom-0 right-0 w-full min-h-screen z-10  ${
          isMenuOpen ? "visible" : "invisible"
        } md:hidden`}
      >
        <h1 className=" text-2xl font-serif p-9 text-white text-left" onClick={handleMenuClick}>
          <Link to="/">StoryHub</Link>
        </h1>

        {/* Menu links */}
        <div className="flex flex-col h-full justify-center items-center text-white">
          {isLoggedIn ? (
            <>
              <Link
                to="/create"
                className="my-3 text-xl font-serif"
                onClick={handleMenuClick}
              >
                Create
              </Link>
              <Link
                to="/my-blogs"
                className="my-3 text-xl font-serif"
                onClick={handleMenuClick}
              >
                My blogs
              </Link>
              <Link
                to="/my-account"
                className="my-3 text-xl font-serif"
                onClick={handleMenuClick}
              >
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-serif px-3 py-1 rounded-sm text-lg font-bold hover:bg-gray-200 my-2"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              onClick={handleMenuClick}
              to={"/sign-in"}
              className="flex items-center bg-white text-blue-500 rounded  px-3 py-1 font-bold hover:bg-gray-200"
            >
              Log In
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to={"/"}
            className="text-2xl text-white font-bold tracking-tight"
          >
           StoryHub
          </Link>

          {/* Hamburger menu icon */}
          <button
            onClick={handleMenuClick}
            className="md:hidden fixed top-10 right-10 z-40 bg-blue-800 shadow-sm rounded text-white text-2xl"
          >
            {isMenuOpen ? <X size="32px" /> : <Menu size="32px" />}
          </button>

          <span className="space-x-2 hidden md:flex">
            {/* Links */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-8 text-white text-2xl">
                <Link to="/create">Create</Link>
                <Link to="/my-blogs">My blogs</Link>
                <Link to="/my-account">Account</Link>
                <button
                  onClick={handleLogout}
                  className="bg-white flex items-center text-blue-600 px-3 py-1 rounded-sm text-lg font-bold hover:bg-gray-200"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to={"/sign-in"}
                className="flex items-center bg-white text-blue-500 rounded  px-3 py-1 font-bold hover:bg-gray-200"
              >
                Log In
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
