import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1 flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
