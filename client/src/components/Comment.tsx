import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { commentBlogAsync } from "../redux/reducers/blogSlice";
import { useState } from "react";

type Props = {
  blogId: string;
};

const Comment = ({ blogId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentContent, setCommentContent] = useState("");

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      await dispatch(commentBlogAsync({ blogId, content: commentContent }));
      setCommentContent("");
    } catch (error) {
      console.error("Failed to post comment:", error);
      // Handle any error that occurs during comment submission
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the comment content as the user types
    setCommentContent(e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex flex-col  text-lg text-gray-600 mt-2 mb-2 gap-2"
    >
      <input
        value={commentContent}
        onChange={handleCommentChange}
        type="text"
        placeholder="Comment here..."
        className="px-4 py-3 outline-none rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <button className="bg-blue-700 text-sm max-w-max rounded-md text-white px-2 py-1">
        Comment
      </button>
    </form>
  );
};

export default Comment;
