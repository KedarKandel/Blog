import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/reducers/userSlice";
import { validateToken } from "../api-client";

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = async()=>{
      await dispatch(logoutUser())
  }
  return (
    <div className="bg-blue-800 py-6">
      <div className=" container mx-auto flex justify-between">
        <span className=" text-2xl text-white font-bold tracking-tight">
          <Link to={"/"} onClick={()=>validateToken()}>EternaThoughts</Link>
        </span>
        <span className=" flex bg-white space-x-2">
          {isLoggedIn ? (
            <>
              <button
              onClick={handleLogout}
               
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
