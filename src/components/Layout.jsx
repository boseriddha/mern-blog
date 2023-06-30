import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="p-[10px] my-0 mx-auto lg:max-w-[60%] md:max-w-[60%] sm:max-w-[100%] sm:p-4">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
