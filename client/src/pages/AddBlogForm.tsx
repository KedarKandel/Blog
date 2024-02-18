import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { IBlog } from "../types";
import { AppDispatch } from "../redux/store";
import { createBlogAsync } from "../redux/reducers/blogSlice";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddBlogForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const [blog, setBlog] = useState<Partial<IBlog>>({
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // submit blog
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiClient.validateToken(); // Wait for token validation to complete
      await dispatch(createBlogAsync(blog as IBlog)); // Dispatch createBlogAsync after token validation
      setBlog({ title: "", description: "" });
      setIsSubmitting(false);
      navigate("/blogs")
    } catch (error) {
      // Handle token validation error
      console.error("Error while validating token:", error);
      setIsSubmitting(false);
    }
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
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          id="description"
          name="description"
          placeholder="Enter content"
          rows={4}
          required
          value={blog.description}
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
    </div>
  );
};

export default AddBlogForm;
