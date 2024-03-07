import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircleMore } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { splitTextIntoParagraphs } from "../utils/utils";
import {
  deleteBlogAsync,
  fetchBlogByIdAsync,
  likeBlogAsync,
} from "../redux/reducers/blogSlice";
import { useEffect, useState } from "react";
import { showToast } from "../redux/reducers/toastSlice";
import * as apiClient from "../api-client";

import { Undo2 } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import ConfirmDelete from "../components/ConfirmDelete";

const BlogPage = () => {
  const { id } = useParams<string>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //delete confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogByIdAsync(id));
    }
  }, [dispatch, id]);

  // separating paragraphs
  const MAX_WORDS_PER_PARAGRAPH = 100;
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
    await dispatch(likeBlogAsync({ blogId: currentBlog._id }));
  };

  const handleComment = () => {
    // Implement logic for commenting on the blog
  };

  // allow delete if user has created the blog
  const handleDelete = async (id: string) => {
    const actionResult = await dispatch(deleteBlogAsync(id));
    if (deleteBlogAsync.rejected.match(actionResult)) {
      dispatch(
        showToast({
          message: actionResult.error.message || "Failed to delete the blog",
          type: "error",
        })
      );
    } else {
      navigate("/");
      dispatch(
        showToast({ message: "Blog deleted successfully", type: "success" })
      );
      // validating token for safety reason again
      await apiClient.validateToken();
    }
  };

  return (
    <div className="container mx-auto flex flex-col my-3 md:my-5 p-5 border rounded-lg shadow-lg bg-white">
      <Link to={"/"} className="text-blue-600 font-bold">
        <Undo2 size={"30px"} />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {currentBlog.title}
      </h1>
      <p className="text-sm text-center font-semibold text-blue-600 mb-2">
        Genre:- {currentBlog.genre.toLocaleUpperCase()}
      </p>
      {descriptionParagraphs?.map((paragraph, index) => (
        <p key={index} className=" flex-1 text-md font-bold text-gray-600 mb-4">
          {paragraph}
        </p>
      ))}
      <div className="flex justify-between items-center text-lg text-gray-600 mb-4">
        <div className=" flex gap-5">
          <div className="relative" onClick={handleLike}>
            <Heart
              fill={`${isLiked ? "red" : "white"}`}
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
        {currentUser?._id === currentBlog.userId ? (
          <button
            onClick={() => setShowConfirmation(true)}
            className=" flex items-center bg-gray-200 px-2 py-1 rounded-sm  font-bold text-red-600 text-xs md:text-sm"
          >
            Delete this blog permanently
          </button>
        ) : (
          ""
        )}
      </div>
      <div className=" flex justify-between items-center text-lg text-gray-600">
        <input
          type="text"
          placeholder="Comment here..."
          className="flex-1 px-4 py-3 mt-2 mb-5 me-5 outline-none rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="flex text-sm items-center gap-1">
            <CircleUserRound />
            <span className="text-xs text.xs md:text-sm text-blue-800">
              {currentBlog.createdBy}
            </span>
          </p>
          <p className="text-xs md:text-sm text-blue-800">
            Updated: {new Date(currentBlog.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>section for displaying comments</div>
      {showConfirmation && (
        <ConfirmDelete
          blog={currentBlog}
          handleDelete={() => handleDelete(currentBlog._id)} // Pass handleDelete function
          setShowConfirmation={setShowConfirmation} // Pass setShowConfirmation function
        />
      )}
    </div>
  );
};

export default BlogPage;
