import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircleMore } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { splitTextIntoParagraphs } from "../utils/utility";
import {
  deleteBlogAsync,
  fetchBlogByIdAsync,
  likeBlogAsync,
} from "../redux/reducers/blogSlice";
import { useEffect, useState } from "react";
import { showToast } from "../redux/reducers/toastSlice";

import { ArrowLeftCircle } from "lucide-react";
import { User } from "lucide-react";
import ConfirmDelete from "../components/ConfirmDelete";
import { CommentType } from "../../../server/src/sharedTypes";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";

const BlogPage = () => {
  const { id } = useParams<string>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentBlog = useSelector((state: RootState) => state.blog.currentBlog);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  //comments
  const [comments, setComments] = useState<CommentType[]>(
    currentBlog?.comments || []
  );

  //delete confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogByIdAsync(id));
    }
  }, [dispatch, id, comments]);

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
    if (!isLoggedIn && !currentUser) {
      navigate("/sign-in");
      return;
    }
    await dispatch(likeBlogAsync({ blogId: currentBlog._id }));
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
    }
  };

  return (
    <div className="container mx-auto flex flex-col my-3 md:my-5 p-5 border rounded-lg shadow-lg bg-white">
      <Link to={"/"} className="text-blue-800 font-bold">
        <ArrowLeftCircle size={"35px"} />
      </Link>
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-800">
        {currentBlog?.title}
      </h1>
      <p className="text-sm text-center font-semibold text-blue-600 mb-2">
        Genre:-  { currentBlog?.genre.toLocaleLowerCase()}
      </p>
      {descriptionParagraphs?.map((paragraph, index) => (
        <p key={index} className=" flex-1 text-md font-bold text-gray-600 mb-4">
          {paragraph}
        </p>
      ))}

      <div className="flex  items-center  justify-between mb-4 p-1 bg-yellow-100 rounded-md">
        <p className="flex items-center text-sm gap-1 mb-2 md:mb-0">
          <User className="text-blue-800" />
          <span className="text-xs md:text-sm text-blue-700">
            {currentBlog?.createdBy}
          </span>
        </p>
        <p className="flex items-center text-sm md:text-sm text-blue-700">
          Last Updated: {new Date(currentBlog?.updatedAt).toLocaleDateString()}
        </p>
      </div>

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
              {currentBlog?.likes?.length}
            </span>
          </div>

          <div className="relative">
            <MessageCircleMore className="inline-block mr-1 cursor-pointer" />
            <span className="text-blue-900 font-bold">
              {currentBlog?.comments?.length}
            </span>
          </div>
        </div>
        {currentUser?._id === currentBlog?.userId ? (
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
      {currentUser && isLoggedIn && (
        <CommentForm blogId={id!} setComments={setComments} />
      )}

      <div className="flex flex-col">
        {currentBlog?.comments?.map((cmt) => (
          <CommentItem key={cmt._id} comment={cmt} userId= {currentUser?._id} blogId= {currentBlog?._id} />
        ))}
      </div>

      {showConfirmation && (
        <ConfirmDelete
          blog={currentBlog}
          handleDelete={() => handleDelete(currentBlog?._id)} // Pass handleDelete function
          setShowConfirmation={setShowConfirmation} // Pass setShowConfirmation function
        />
      )}
    </div>
  );
};

export default BlogPage;
