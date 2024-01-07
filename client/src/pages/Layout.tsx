import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className=" w-100 flex bg-gray-100 justify-between items-center p-5 shadow-sm">
        <h1 className="text-2xl font-mono text-cyan-500">
          <Link to="/">Bloggers</Link>
        </h1>
        <ul className="text-lg text-cyan-500 font-semibold flex gap-4">
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
