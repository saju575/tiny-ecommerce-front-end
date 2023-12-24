import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar/navbar.ui.component";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
