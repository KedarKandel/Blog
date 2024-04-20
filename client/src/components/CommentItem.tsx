import { CommentType, UserType } from "../sharedTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  deleteCommentAsync,
  fetchBlogByIdAsync,
  likeCommentAsync,
} from "../redux/reducers/blogSlice";
import { showToast } from "../redux/reducers/toastSlice";
import { Link, useNavigate } from "react-router-dom";
import { User, ThumbsUp } from "lucide-react";

type Props = {
  comment: CommentType;
  user: Partial<UserType> | null;
  blogId: string;
};

const CommentItem = ({ comment, user, blogId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const commentId = comment._id;

  const handleCommentDelete = async () => {
    try {
      const actionResult = await dispatch(
        deleteCommentAsync({ commentId, blogId })
      );
      if (deleteCommentAsync.rejected.match(actionResult)) {
        dispatch(
          showToast({
            message:
              actionResult.error.message ||
              "An error occurred while deleteing comment.",
            type: "error",
          })
        );
      } else {
        dispatch(showToast({ message: "comment removed from the post", type: "success" }));
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "An unexpected error occured while deleteing the comment",
          type: "error",
        })
      );
    }
  };

  const handleCommentLike = async () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    await dispatch(likeCommentAsync({ blogId, commentId }));
    dispatch(fetchBlogByIdAsync(blogId));
  };

  return (
    <div className="flex flex-col gap-2 p-3 border-t-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm">
          <User size={16} className="text-blue-600" />
          <span>{comment.userName}</span>
        </div>

        <p className="text-blue-600">{comment.content}</p>

        <div className="flex  items-center justify-between gap-2 text-blue-900">
          <div className="flex items-center justify-center gap-1 mt-1">
            <Link to={user ? "#" : "/sign-in"} onClick={handleCommentLike}>
              <ThumbsUp
                size={"30px"}
                color={
                  user && user._id && comment.likes?.includes(user._id)
                    ? "blue"
                    : "gray"
                }
              />
            </Link>
            <span className=" -mt-4 text-2xl"> {comment.likes?.length}</span>
          </div>

          {user?._id === comment.userId ? (
            <button className="text-red-400" onClick={handleCommentDelete}>
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
