import { useSelector } from "react-redux";
import Header from "../components/header";
import Blog from "../components/Blog";
import { RootState } from "../redux/store";
import { IBlog } from "../interface";
import AddBlogBtn from "../components/AddBlogBtn";

const Blogs = () => {
  const blogs = useSelector((state: RootState) => state.blog);

  return (
    <div className="p-4 flex flex-col">
      <Header />
      <AddBlogBtn />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {blogs.map((post: IBlog) => (
          <Blog key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
