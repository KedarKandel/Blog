import { useDispatch } from "react-redux";
import { IBlog } from "../interface";
import { AppDispatch } from "../redux/store";
import { addNewBlog } from "../redux/reducers/blogReducer";
import { Link } from "react-router-dom";

const AddBlogBtn = () => {

  const dispatch = useDispatch<AppDispatch>()
  const newBlog:IBlog ={
    id:1,
    title:"Blog 1",
    content: "This is a new blog "
  }

  const handleAdd = ()=>{
    dispatch(addNewBlog(newBlog))
  }
  return (
    <Link to={"/addBlog"}
      className=" m-4 p-1  text-md rounded outline bg-cyan-600 text-white max-w-max"
      onClick={handleAdd}
    >
      Add Blog
    </Link>
  );
};

export default AddBlogBtn;
