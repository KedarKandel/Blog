import { User } from "lucide-react"; // You can replace these icons with your preferred icons
import { CommentType } from "../../../server/src/sharedTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteCommentAsync } from "../redux/reducers/blogSlice";
import { showToast } from "../redux/reducers/toastSlice";

type Props = {
  comment: CommentType;
  userId: string | undefined;
  blogId: string;
};

const CommentItem = ({ comment, userId, blogId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <div className="flex flex-col gap-2 p-3 border-t-2">
      {/* <button onClick={handleLike}>Like</button>
          <button onClick={handleReply}>Reply</button> */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center">
          <User size={16} />
          <span>{comment.userName}</span>
        </div>

        <p className="text-blue-600">{comment.content}</p>

        <div className="flex  items-center justify-end gap-2 text-blue-900">
          {userId === comment.userId ? (
            <button onClick={handleCommentDelete}>Delete</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
