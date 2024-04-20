import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUserAsync } from "../redux/reducers/userSlice";
import { showToast } from "../redux/reducers/toastSlice";
import {
  BookOpenText,
  Menu,
  SettingsIcon,
  SquarePen,
  LogOut,
  LogIn,
  Rss,
} from "lucide-react";
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
        <h1
          className=" text-3xl font-serif p-9 text-yellow-500 text-left"
          onClick={handleMenuClick}
        >
          <Link to="/">ExpressEcho</Link>
        </h1>

        {/* Menu links */}
        <div className="flex flex-col h-full justify-center items-center text-yellow-400">
          {isLoggedIn ? (
            <>
              <Link
                to="/create"
                className="my-3 text-xl font-serif text-yellow-400  flex items-center gap-1 "
                onClick={handleMenuClick}
              >
                write <SquarePen />
              </Link>
              <Link
                to="/my-blogs"
                className="my-3 text-xl font-serif  flex items-center gap-1  "
                onClick={handleMenuClick}
              >
                My Blogs <BookOpenText />
              </Link>
              <Link
                to="/my-account"
                className="my-3 text-xl font-serif   flex items-center gap-1 "
                onClick={handleMenuClick}
              >
                Account <SettingsIcon />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-serif px-3 py-1 rounded-sm text-md font-bold hover:bg-gray-200 my-2 flex items-center gap-1 "
              >
                Logout <LogOut />
              </button>
            </>
          ) : (
            <Link
              onClick={handleMenuClick}
              to={"/sign-in"}
              className="flex items-center gap-1 bg-white text-blue-500 text-sm rounded  px-3 py-1 font-bold hover:bg-gray-200 "
            >
              Log In <LogIn />
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to={"/"}
            className="text-2xl text-yellow-400 font-bold tracking-tight"
          >
            ExpressEcho
          </Link>

          {/* Hamburger menu icon */}
          <button
            onClick={handleMenuClick}
            className="md:hidden fixed top-10 right-10 z-40 bg-blue-800 shadow-sm rounded text-white text-2xl"
          >
            {isMenuOpen ? <X size="32px" /> : <Menu size="32px" />}
          </button>

          <span className="space-x-2 hidden md:flex">
            <Link
              to="/"
              className="mr-5 text-xl font-serif text-yellow-400  flex items-center gap-1 "
              onClick={handleMenuClick}
            >
             <Rss />
            </Link>
            {/* Links */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-8 text-xl text-yellow-100">
                <Link to="/create" className=" flex items-center gap-1 text-sm">
                  write
                  <SquarePen />
                </Link>
                <Link
                  to="/my-blogs"
                  className=" flex items-center gap-1 text-sm"
                >
                  My blogs <BookOpenText />
                </Link>
                <Link
                  to="/my-account"
                  className=" flex items-center gap-1 text-sm"
                >
                  Account <SettingsIcon />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white flex items-center gap-1 text-blue-600 px-2 py-1 rounded-sm text-sm font-bold hover:bg-gray-200"
                >
                  Logout <LogOut />
                </button>
              </div>
            ) : (
              <Link
                to={"/sign-in"}
                className="flex items-center gap-1 bg-white text-blue-500 text-sm rounded  px-3 py-1 font-bold hover:bg-gray-200"
              >
                Log In <LogIn />
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
