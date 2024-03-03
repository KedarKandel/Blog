import { BlogType } from "../../../server/src/sharedTypes";

type Props = {
  blog: BlogType;
  onEdit: () => void;
  onDelete: () => void;
};

const BlogItem = ({ blog, onEdit, onDelete }: Props) => {
  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex-1">
          <div className="text-md font-medium text-gray-900 mb-1">
            Title:<span className="text-red-500 ms-1 ">{blog.title}</span>
          </div>
          <div className="text-md text-gray-500">Genre: {blog.genre}</div>
        </div>
        <div className="flex-1">
          <div className="text-md text-gray-500">
            Last Updated: {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-md text-gray-500">
            Like count: {blog.likes?.length}
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-2">
        <p className="text-lg text-gray-500">Text: {blog.description}</p>
      </div>
      <div className="flex md:justify-end justify-center px-4 sm:px-6 py-2">
        <button
          onClick={onEdit}
          className="text-gray-200 hover:text-white bg-blue-800 rounded-md p-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-gray-200 bg-red-600 hover:text-white rounded-md p-2 ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
