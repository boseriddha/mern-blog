import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/userContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => setUserInfo(data));
    });
  }, []);

  const logout = () => {
    // invalidating token on the backend
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    // setting username as null
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center text-inherit mb-[50px] mt-5">
      <Link to="/" className="font-bold lg:text-2xl md:text-xl sm:text-lg">
        MyBlog
      </Link>
      <nav className="flex gap-[20px] sm:text-xs md:text-base lg:text-base">
        {username !== undefined ? (
          <>
            <Link to="/create">Create New Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
