import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const Home = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  return (
    <div className="flex flex-col">
      <h1>homepage</h1>
      <div className="flex gap-3 flex-1 ">
        {blogs?.map((b,i) => (
          <div key={i} className=" bg-gray-600">
            <h1>{b.id}</h1>
            <span>{b.title}</span>
            <p>{b.description}</p>
          </div>
        ))}
      </div>

      <Link to="/blogs">blog</Link>
    </div>
  );
};

export default Home;
