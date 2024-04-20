import { Link } from "react-router-dom";
import { BlogType } from "../sharedTypes";
import { truncateDescription } from "../utils";
import { Heart } from "lucide-react";
import { MessageCircleMore } from "lucide-react";

type Props = {
  blog: BlogType;
};

const Blog = ({ blog }: Props) => {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className=" flex flex-col my-3 md:my-5 p-5 border rounded-lg shadow-lg bg-white hover:bg-gray-100 cursor-pointer transition-all"
    >
      <h1 className="text-1xl font-bold text-center mb-4 text-gray-800">
        {blog.title}
      </h1>
      <p className="text-sm text-center font-semibold text-gray-600 mb-2">
        {blog.genre}
      </p>
      <p className=" flex-1 flex justify-center items-center text-sm text-left text-gray-700 mb-4">
        {truncateDescription(blog.description)}
      </p>
      <div className="flex justify-between items-center text-lg text-gray-600">
        <div className="relative">
          <Heart className="inline-block mr-1" fill="red" />
          <span className=" text-1xl text-blue-900 font-bold rounded-full flex justify-center items-center absolute -top-2 -right-2 ">
            {blog.likes?.length}
          </span>
        </div>
        <div className="relative">
          <MessageCircleMore className="inline-block mr-1" />
          <span className=" text-1xl text-blue-900 font-bold rounded-full  flex justify-center items-center absolute -top-2 -right-2">
            {blog.comments?.length}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-lg text-gray-600 mt-1">
        <p className="flex text-sm items-center gap-1">
          By: <span className="text-sm text-blue-800">{blog.createdBy}</span>
        </p>
        <p className=" text-sm text-blue-800">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default Blog;
