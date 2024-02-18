import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { hideToast } from "../redux/reducers/toastSlice";
import { XSquare } from "lucide-react";

const Toast = () => {
  const message = useSelector((state: RootState) => state.toast.message);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <div
      className={`fixed top-2 right-5 flex items-center bg-gray-900 text-white p-4 rounded-md transition-opacity duration-300 ease-in-out ${
        message
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <span>{message}</span>
      <button className="  ml-2 text-white" onClick={handleClose}>
        <XSquare className="text-red-500" />
      </button>
    </div>
  );
};

export default Toast;
