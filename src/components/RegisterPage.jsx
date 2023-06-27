const RegisterPage = () => {
  return (
    <div className="w-[100%]">
      <form className="my-0 mx-auto max-w-[500px]">
        <h1 className="font-bold text-4xl mb-5 text-center">Register</h1>
        <input
          type="text"
          placeholder="Username"
          className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
        />
        <button className="w-[100%] p-2 block rounded-[5px] bg-[#555] text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
