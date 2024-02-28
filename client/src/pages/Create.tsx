import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createBlogAsync } from "../redux/reducers/blogSlice";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { showToast } from "../redux/reducers/toastSlice";



const Create = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUser?._id
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [createdBy, setCreatedBy] = useState(currentUserId || "");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "description") setDescription(value);
    else if (name === "genre") setGenre(value);
    else if (name === "createdBy") setCreatedBy(value);
  };

  // submit blog
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiClient.validateToken();
      await dispatch(
        createBlogAsync({
          title: title,
          description: description,
          genre: genre,
          createdBy: createdBy,
        })
      );
      setTitle("");
      setDescription("");
      setGenre("");
      setCreatedBy(currentUserId || "");
      navigate("/");
      dispatch(
        showToast({ message: "New blog creation successful", type: "success" })
      );
    } catch (error) {
      console.error("Error while validating token:", error);
      dispatch(showToast({ message: "Error adding blog", type: "error" }));
    }
  };

  return (
    <div className=" flex  flex-1 items-center justify-center">
     
      <form
        className="p-8 rounded-md shadow-2xl max-w-md w-full"
        onSubmit={handleSubmit}
      >
         <h1 className=" font-bold text-2xl text-blue-600 text-center">WRITE A BLOG</h1>
        <label className="block mb-2 text-gray-700 font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          required
          value={title}
          onChange={handleChange}
        />

        <label className="block mt-4 mb-2 text-gray-700 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="description"
          name="description"
          placeholder="Enter content"
          rows={8}
          required
          value={description}
          onChange={handleChange}
        />

        <select
          name="genre"
          id="genre"
          className="block appearance-none font-semibold w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          required
          value={genre}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Genre
          </option>
          <option value="science">Science</option>
          <option value="technology">Technology</option>
          <option value="history">History</option>
          <option value="love">Love</option>
          <option value="nature">Nature</option>
          <option value="sports">Sport</option>
        </select>

        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default Create;
