import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col">
      <h1>homepage</h1>
      <Link to="/blogs">blog</Link>
    </div>
  );
};

export default Home;
