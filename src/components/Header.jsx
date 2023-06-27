import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center text-inherit mb-[50px] mt-5">
      <Link to="/" className="font-bold text-2xl">
        MyBlog
      </Link>
      <nav className="flex gap-[15px]">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
