import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    // console.log({ username, password });
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 201) {
      alert("Registration Failed");
    } else {
      alert("Registration Successful!");
    }
  }

  return (
    <div className="w-[100%]">
      <form className="my-0 mx-auto max-w-[500px]" onSubmit={register}>
        <h1 className="font-bold text-4xl mb-5 text-center">Register</h1>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
