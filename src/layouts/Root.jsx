import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <div className="min-h-[calc(100vh-317px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
