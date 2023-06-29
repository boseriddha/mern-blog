import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/userContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((data) => {
        setUserInfo(data);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-[100%]">
      <form className="my-0 mx-auto max-w-[500px]" onSubmit={login}>
        <h1 className="font-bold text-4xl mb-5 text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-[100%] p-2 block rounded-[5px] bg-[#555] text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
