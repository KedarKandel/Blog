import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import {
  currentUserAsync,
  editUserProfileAsync,
} from "../redux/reducers/userSlice";
import { EditProfileData } from "../types";
import { showToast } from "../redux/reducers/toastSlice";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editedFirstName, setEditedFirstName] = useState(
    currentUser?.firstName || ""
  );
  const [editedLastName, setEditedLastName] = useState(
    currentUser?.lastName || ""
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: EditProfileData = {
      firstName: editedFirstName,
      lastName: editedLastName,
      email: currentUser?.email! || "",
      currentPassword,
      newPassword,
    };

    try {
      const actionResult: any = await dispatch(editUserProfileAsync(data));

      if (editUserProfileAsync.rejected.match(actionResult)) {
        dispatch(
          showToast({
            message:
              actionResult.error.message ||
              "An error occurred while updating profile.",
            type: "error",
          })
        );
      } else {
        dispatch(currentUserAsync());
        dispatch(
          showToast({
            message: actionResult.payload.message as string,
            type: "success",
          })
        );
        await apiClient.validateToken();
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "An unexpected error occured during login",
          type: "error",
        })
      );
      console.error("An unexpected error occurred during login:", error);
    }
  };

  // fetch current user after updating

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className=" shadow-md w-full p-2 md:p-6">
        <h1 className=" text-3xl mb-3 font-bold text-blue-600 text-center underline ">
          Edit Profile
        </h1>
        <form className="text-blue-600 w-full md:p-5" onSubmit={handleSubmit}>
          <div className="md:flex items-center w-full gap-4">
            <label htmlFor="firstName" className=" flex flex-1 flex-col">
              First Name
              <input
                type="text"
                value={editedFirstName}
                autoFocus
                onChange={(e) => setEditedFirstName(e.target.value)}
                className=" font-bold p-4"
              />
            </label>
            <label htmlFor="lastName" className="flex flex-1 flex-col">
              Last Name
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                className=" font-bold p-4"
              />
            </label>
          </div>
          <label htmlFor="Username" className="flex flex-col">
            Username*
            <input
              type="email"
              value={currentUser?.email}
              readOnly
              className=" font-bold p-4"
            />
          </label>
          <label htmlFor="currentPassword" className="flex flex-col">
            Current Password
            <input
              type="password"
              placeholder="Current Password"
              className=" font-bold p-4"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <label htmlFor="Newpassword" className="flex flex-col">
            New Password
            <input
              type="password"
              placeholder="New Password"
              className=" font-bold p-4"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <button className="flex items-center py-2 px-3 mt-3 bg-blue-600 text-white text-lg rounded-md font-bold">
              Save
            </button>
            <Link to={"/"} 
              type="button"
              className="flex items-center py-2 px-3 mt-3 bg-red-500 text-white text-lg rounded-md font-bold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
