import { useSelector } from "react-redux";

import Blog from "../components/Blog";
import { RootState } from "../redux/store";
import { IBlog } from "../interface";
import AddBlogBtn from "../components/AddBlogBtn";

const Blogs = () => {
  const blogs = useSelector((state: RootState) => state.blog);
  return (
    <div className="container mx-auto flex flex-col ">
     
      <AddBlogBtn />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogs.map((blog: IBlog) => (
         <Blog key={blog.id} {...blog}/>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
