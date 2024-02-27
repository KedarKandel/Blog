import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import {  useSelector } from "react-redux";
import {  RootState } from "../redux/store";
import { splitTextIntoParagraphs } from "../utils/utils";



// separating paragraphs
const MAX_WORDS_PER_PARAGRAPH = 250;

const BlogPage = () => {
  const { id } = useParams<string>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const blog = blogs.find((blog) => blog._id === id);

  console.log(currentUser);
  const descriptionParagraphs = splitTextIntoParagraphs(
    blog?.description!,
    MAX_WORDS_PER_PARAGRAPH
  );

  if (!blog) {
    return <div>Loading...</div>; // Handle case where blog is not found
  }

  const handleLike = async () => {};

  const handleComment = () => {
    // Implement logic for commenting on the blog
  };

  return (
    <div className="my-3 md:my-5 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {blog.title}
      </h1>
      <p className="text-sm text-center font-semibold text-gray-600 mb-2">
        {blog.genre}
      </p>
      {descriptionParagraphs?.map((paragraph, index) => (
        <p key={index} className="text-sm text-gray-700 mb-4">
          {paragraph}
        </p>
      ))}
      <div className="flex justify-between items-center text-lg text-gray-600 mb-4">
        <div className="relative" onClick={handleLike}>
          <Heart className="inline-block mr-1 cursor-pointer" />
          <span className="text-blue-900 font-bold">{blog.likes?.length}</span>
        </div>
        <div className="relative" onClick={handleComment}>
          <MessageCircleMore className="inline-block mr-1 cursor-pointer" />
          <span className="text-blue-900 font-bold">
            {blog.comments?.length}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-lg text-gray-600">
        <p className="flex text-sm items-center gap-1">
          By: <span className="text-sm text-blue-800">{blog.createdBy}</span>
        </p>
        <p className="text-sm text-blue-800">
          Last Updated: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
