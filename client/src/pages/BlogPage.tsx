import { useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { splitTextIntoParagraphs } from "../utils/utils";
import { fetchBlogByIdAsync, likeBlogAsync } from "../redux/reducers/blogSlice";
import { useEffect } from "react";

const BlogPage = () => {
  const { id } = useParams<string>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentBlog && id) {
      dispatch(fetchBlogByIdAsync(id));
    }
  }, [dispatch, id, currentBlog]);

 

  // separating paragraphs
  const MAX_WORDS_PER_PARAGRAPH = 250;
  const descriptionParagraphs = splitTextIntoParagraphs(
    currentBlog?.description! || "",
    MAX_WORDS_PER_PARAGRAPH
  );

  if (!currentBlog) {
    return <div>Loading...</div>; // Handle case where blog is not found
  }

  // Check if the user has already liked the blog
  const isLiked =
    Array.isArray(currentBlog?.likes) &&
    currentBlog.likes.includes(currentUser?._id || "");
  const handleLike = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    // Dispatch the likeBlogAsync action if the user has not already liked the blog
    if (!isLiked) {
      await dispatch(likeBlogAsync({ blogId: currentBlog._id }));
    }
  };

  const handleComment = () => {
    // Implement logic for commenting on the blog
  };

  return (
    <div className="my-3 md:my-5 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {currentBlog.title}
      </h1>
      <p className="text-sm text-center font-semibold text-blue-600 mb-2">
        {currentBlog.genre.toLocaleUpperCase()}
      </p>
      {descriptionParagraphs?.map((paragraph, index) => (
        <p key={index} className="text-md font-bold text-gray-600 mb-4">
          {paragraph}
        </p>
      ))}
      <div className="flex justify-between items-center text-lg text-gray-600 mb-4">
        <div className="relative" onClick={handleLike}>
          <Heart
            className={`inline-block mr-1 cursor-pointer ${
              isLiked ? "text-red-500" : ""
            }`}
          />
          <span className="text-blue-900 font-bold">
            {currentBlog.likes?.length}
          </span>
        </div>

        <div className="relative" onClick={handleComment}>
          <MessageCircleMore className="inline-block mr-1 cursor-pointer" />
          <span className="text-blue-900 font-bold">
            {currentBlog.comments?.length}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-lg text-gray-600">
        <p className="flex text-sm items-center gap-1">
          By:{" "}
          <span className="text-sm text-blue-800">{currentBlog.createdBy}</span>
        </p>
        <p className="text-sm text-blue-800">
          Last Updated: {new Date(currentBlog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
