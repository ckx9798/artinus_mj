import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
