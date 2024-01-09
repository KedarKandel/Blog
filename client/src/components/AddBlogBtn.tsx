import { Link } from "react-router-dom";

const AddBlogBtn = () => {
  return (
    <Link
      to={"/addBlogForm"}
      className=" m-4 p-1  text-md rounded outline bg-cyan-600 text-white max-w-max"
    >
      Add Blog
    </Link>
  );
};

export default AddBlogBtn;
