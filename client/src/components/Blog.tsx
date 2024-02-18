import { Link } from "react-router-dom";

interface BlogProps {
  id: number;
  title: string;
  content: string;
}
const Blog = (blog: BlogProps) => {
  // trim the content
  const maxContent = 200;
  const trimmedContent = blog.content.trim().slice(0, maxContent);
  const displayContent =
    blog.content.length > maxContent ? trimmedContent + "..." : trimmedContent;
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div
        key={blog.id}
        className="bg-white rounded-md shadow-md p-4 flex flex-col items-center"
      >
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-600 overflow-hidden text-ellipsis">
            {displayContent}
          </p>
        </div>
        <div className="mt-2">
          {/* Additional information or actions if needed */}
        </div>
      </div>
    </Link>
  );
};

export default Blog;
