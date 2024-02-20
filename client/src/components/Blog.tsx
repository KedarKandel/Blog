import { IBlog } from "../types";
import { truncateDescription } from "../utils/utils";

type Props = {
  blog: IBlog;
};

const Blog = ({ blog }: Props) => {
  return (
    <div className=" flex flex-col m-5 p-6 border rounded-lg shadow-lg bg-white hover:bg-gray-100 cursor-pointer transition-all">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {(blog.title)}
      </h1>
      <p className="text-sm text-center font-semibold text-gray-600 mb-2">{blog.genre}</p>
      <p className=" flex-1 text-sm text-gray-700 mb-4">
        {truncateDescription(blog.description)}
      </p>
      <div className="flex justify-between items-center text-lg text-gray-600">
        <p>By: <span className=" text-blue-800">{blog.createdBy}</span></p>
        <p className="text-blue-800">{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Blog;
