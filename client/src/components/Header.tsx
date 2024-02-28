import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUserAsync } from "../redux/reducers/userSlice";
import { validateToken } from "../api-client";
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
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to={"/"} onClick={() => validateToken()}>
            EternaThoughts
          </Link>
        </span>

        {/* Hamburger menu icon */}
        <button
          onClick={handleMenuClick}
          className=" md:hidden z-10 text-white text-2xl"
        >
          {isMenuOpen ? <Menu size="32px" /> : <X size="32px" />}
        </button>

        <span className="  space-x-2 hidden md:flex">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-8 text-white text-2xl">
              <Link to="/create">Create</Link>
              <Link to="/my-blogs">My blogs</Link>
              <Link to="/my-profile">Profile</Link>
              <button
                onClick={handleLogout}
                className=" bg-white flex items-center text-blue-600 px-3 py-1 rounded-sm text-lg font-bold hover:bg-gray-200"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center bg-white text-blue-500 px-3 font-bold hover:bg-gray-200"
            >
              Log In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
