import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogsAsync } from "../redux/reducers/blogSlice";
import { AppDispatch, RootState } from "../redux/store";
import { BlogType } from "../../../server/src/sharedTypes";

const MyBlogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.currentUser?._id);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  console.log(blogs)

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserBlogsAsync());
    }
  }, [dispatch, userId]);

  return (
    <div>
      {blogs.map((b: BlogType) => (
        <div key={b._id}>{b.title}</div>
      ))}
    </div>
  );
};

export default MyBlogs;
