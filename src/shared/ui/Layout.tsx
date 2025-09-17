import Header from "./Header";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { Suspense } from "react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
