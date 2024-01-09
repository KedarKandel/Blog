import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { IBlog } from "../interface";

type Props = {};

const Blog = (props: Props) => {
  const { id } = useParams<string>();
  console.log(id);
  
  const blogs = useSelector((state: RootState) => state.blog);
  console.log(blogs);
  
  const matchedBlog: IBlog | undefined = id ? blogs.find((b) => b.id === parseInt(id, 10)) : undefined;
  
  console.log(matchedBlog);

  if (!matchedBlog) {
    return <div className="text-red-500">Blog not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{matchedBlog.title}</h2>
      <p className="text-gray-600 mb-4">{matchedBlog.content}</p>
      {/* Add other blog details as needed */}
    </div>
  );
};

export default Blog;
