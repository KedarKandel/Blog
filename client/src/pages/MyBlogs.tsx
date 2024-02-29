import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogsAsync } from "../redux/reducers/blogSlice";
import { AppDispatch, RootState } from "../redux/store";
import { BlogType } from "../../../server/src/sharedTypes";
import MyBlog from "../components/MyBlog";

const MyBlogs = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.user.currentUser?._id);
  const userName = useSelector(
    (state: RootState) => state.user.currentUser?.firstName
  );
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBlogsAsync());
    }
  }, [dispatch, userId]);

  // delete
  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 text-2xl mb-5">
        <h1 >
          REFLECTION OF YOUR
          <span className="text-blue-400 font-semibold ms-1">CREATIVITY</span> HERE
        </h1>
        <h1 className="text-blue-600 ">
          <span className="font-sans text-red-500 me-1">{userName}</span>
          you have posted
          <span className=" font-sans text-red-500 ms-1">{blogs?.length} </span>
          {blogs?.length > 0 ? "blogs already." : "blog"}
        </h1>
      </div>
      <div className="border border-blue-300">
        {blogs.map((blog: BlogType) => (
          <MyBlog
            key={blog._id}
            blog={blog}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
