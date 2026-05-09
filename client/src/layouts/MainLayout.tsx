import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>

      <Navbar />

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;