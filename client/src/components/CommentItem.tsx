import { CommentType, UserType } from "../../../server/src/sharedTypes";
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
        dispatch(showToast({ message: "deleted", type: "success" }));
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
          <div className="flex  gap-4 ">
            {user ? (
              <>
                <Link
                  to="#"
                  onClick={handleCommentLike}
                  className={
                    user && user._id && comment.likes?.includes(user._id)
                      ? "font-bold text-blue-500"
                      : ""
                  }
                >
                  Like
                </Link>

                <span className="flex items-center justify-center gap-1">
                  <ThumbsUp /> {comment.likes?.length}
                </span>
              </>
            ) : (
              ""
            )}
          </div>

          {user?._id === comment.userId ? (
            <button className="" onClick={handleCommentDelete}>
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
