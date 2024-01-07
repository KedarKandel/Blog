import { Link } from "react-router-dom";

interface BlogProps {
  id: number;
  title: string;
  content: string;
}
const Blog = (blog: BlogProps) => {
  return (
    <div className="flex flex-col p-3 shadow-md justify-center items-center cursor-pointer">
      <h3 className=" uppercase text-xl font-medium p-2 text-cyan-500">
        {blog.title}
      </h3>
      <p className=" text-center space-x-2">{blog.content.slice(0, 100)}</p>
      <button className=" p-1 mt-2 text-black outline ">
        <Link to={`/blogs/${blog.id}`}>Read More</Link>
      </button>
    </div>
  );
};

export default Blog;
