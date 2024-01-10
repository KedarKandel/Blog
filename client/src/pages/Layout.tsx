import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className=" container mx-auto flex-1 py-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
