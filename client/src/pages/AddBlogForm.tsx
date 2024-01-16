import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IBlog } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addNewBlog } from "../redux/reducers/blogSlice";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AddBlogForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Partial<IBlog>>({
    title: "",
    content: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // submit blog
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(addNewBlog(blog as IBlog));

    // Notify with toast
    toast.success("New Blog has been added!");
    setTimeout(() => {
      setBlog({ title: "", content: "", image: "" });
      setIsSubmitting(false);
      navigate("/blogs");
    }, 4000);
  };

  return (
    <div className=" flex items-center justify-center">
      <form
        className=" p-8 rounded-md shadow-2xl max-w-md w-full"
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

        <label className="block mt-4 mb-2 text-gray-700" htmlFor="content">
          Image
        </label>
        <input
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="image"
          name="image"
          placeholder="Enter image source url"
          value={blog.image}
          onChange={handleChange}
        />

        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Add Blog"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddBlogForm;
