import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import AddBlogForm from "./pages/AddBlogForm";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function App() {
  
const isLoggedIn = useSelector((state: RootState)=>state.user.isLoggedIn)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="addBlogForm" element={<AddBlogForm />} />
          <Route path="blogs/:id" element={<Blog />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
