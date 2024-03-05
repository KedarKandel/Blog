import { useState } from "react";
import { BlogType } from "../../../server/src/sharedTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateBlogAsync } from "../redux/reducers/blogSlice";
import { showToast } from "../redux/reducers/toastSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  blog: BlogType | null;
  setIsEditBlog: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMyBlog = ({ blog, setIsEditBlog }: Props) => {
  const [updatedBlog, setUpdatedBlog] = useState({
    title: blog?.title || "",
    description: blog?.description || "",
    genre: blog?.genre || "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedBlog({
      ...updatedBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (blog) {
        const blogId = blog._id;
        const actionResult = await dispatch(
          updateBlogAsync({ blogId, updatedBlog })
        );
        if (updateBlogAsync.rejected.match(actionResult)) {
          dispatch(
            showToast({
              message:
                actionResult.error.message ||
                "An error occurred while updating.",
              type: "error",
            })
          );
        }else{
          dispatch(showToast({message:"Blog updated successfully", type:"success"}))
          setIsEditBlog(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-2 p-3">
      <h1 className="text-2xl text-blue-600 text-center font-bold tracking-tight mb-2 ">
        Edit this blog
      </h1>
      <label htmlFor="title" className="flex flex-col  gap-1 text-gray-900">
        Title
        <input
          className=" md:w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={updatedBlog.title}
          onChange={handleChange}
        />
      </label>

      <label
        htmlFor="description"
        className="flex flex-col  gap-1 text-gray-900"
      >
        Description
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="description"
          name="description"
          placeholder="Enter content"
          rows={8}
          value={updatedBlog.description}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="genre" className="flex flex-col gap-1 text-gray-900">
        Genre
        <select
          name="genre"
          id="genre"
          className="block appearance-none max-w-max w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={updatedBlog.genre}
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
      </label>

      <span className=" flex justify-between ">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Update
        </button>
        <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsEditBlog(false)}
        >
          Cancel
        </button>
      </span>
    </form>
  );
};

export default EditMyBlog;
