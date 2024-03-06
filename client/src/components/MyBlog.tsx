import { BlogType } from "../../../server/src/sharedTypes";
import { NotebookPen } from "lucide-react";
import { Trash2 } from "lucide-react";

type Props = {
  blog: BlogType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const MyBlog = ({ blog, onEdit, onDelete }: Props) => {
  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col  md:flex-row items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex flex-col sm:justify-start">
          <p className="text-md font-medium text-gray-900 mb-1">
            Title:<span className="text-red-500 ms-1 ">{blog.title}</span>
          </p>
          <p className="text-md text-gray-500">Genre: {blog.genre}</p>
        </div>

        <p className="text-md text-gray-500">
          Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}
        </p>

        <p className=" text-md text-gray-500">
          Like count: {blog.likes?.length}
        </p>
      </div>

      <p className="px-4 sm:px-6 py-2 text-lg text-gray-500">
        Text: {blog.description}
      </p>

      <div className="flex  justify-between px-4 sm:px-6 py-2 mt-3 ">
        <button
          onClick={() => onEdit(blog._id)}
          className="flex items-center gap-1 text-gray-200 hover:text-white bg-blue-800 rounded-md p-2"
        >
          <NotebookPen fill="blue" />
          Edit
        </button>
        <button
          onClick={() => onDelete(blog._id)}
          className="flex items-center text-gray-200 bg-red-600 hover:text-white rounded-md p-2 ml-2"
        >
          <Trash2 fill="red" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyBlog;
