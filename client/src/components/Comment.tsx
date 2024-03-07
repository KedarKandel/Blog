
const Comment = () => {
  return (
    <form className="flex flex-col  text-lg text-gray-600 mt-2 mb-2 gap-2">
      <input
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
