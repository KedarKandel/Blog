import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { commentBlogAsync } from "../redux/reducers/blogSlice";
import { useState } from "react";
import { BlogType, CommentType } from "../sharedTypes";

type Props = {
  blogId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const CommentForm = ({ blogId, setComments }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentContent, setCommentContent] = useState("");

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        commentBlogAsync({ blogId, content: commentContent })
      );

      const newBlog: BlogType = response.payload as BlogType;
      setComments(newBlog.comments || []);
      setCommentContent("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default CommentForm;
