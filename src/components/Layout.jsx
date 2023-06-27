import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="p-[10px] my-0 mx-auto max-w-[60%]">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
