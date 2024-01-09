import { ChangeEvent, FormEvent, useState } from "react";
import { IBlog } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addNewBlog } from "../redux/reducers/blogReducer";

const AddBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [blog, setBlog] = useState<Partial<IBlog>>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // submit blog

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dispatch the action with the new blog object containing only title and content
    dispatch(addNewBlog(blog as IBlog));

    // Reset the form after adding a blog
    setBlog({ title: "", content: "" });
  };



  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-md shadow-md max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <label className="block mb-2 text-gray-700" htmlFor="title">
          Title
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          required
          value={blog.title}
          onChange={handleChange}
        />

        <label className="block mt-4 mb-2 text-gray-700" htmlFor="content">
          Content
        </label>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="content"
          name="content"
          placeholder="Enter content"
          rows={4}
          required
          value={blog.content}
          onChange={handleChange}
        />

        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
