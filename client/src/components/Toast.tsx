import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { hideToast } from "../redux/reducers/toastSlice";
import { useEffect } from "react";

const Toast = () => {
  const { message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const toastTimeout = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(toastTimeout);
    }
  }, [message, dispatch]);

  return (
    <div
      className={`fixed top-5 right-10 z-1000 flex items-center text-white text-sm py-2 px-4 rounded-md transition-opacity duration-300 ease-in-out ${
        message
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
      ${type === "error" ? "bg-red-500" : " bg-green-600"}
      `}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
