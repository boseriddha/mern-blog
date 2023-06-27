const Post = () => {
  return (
    <div className="post grid grid-cols-[.9fr_1.1fr] gap-[20px] mb-7">
      <div className="flex justify-center items-center">
        <img
          src="https://cdn.vox-cdn.com/thumbor/hpncNvQsR4aII8oGo8GHGufsd-c=/0x0:3765x2896/920x613/filters:focal(1582x1147:2184x1749):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72404511/1258930452.0.jpg"
          alt=""
          className="max-w-[100%]"
        />
      </div>
      <div className="text">
        <h2 className="text-xl font-bold m-0">
          What’s going on with Vladimir Putin after the mutiny?
        </h2>
        <p className="my-[6px] mx-0 text-xs font-bold text-[#888] flex gap-[10px]">
          <a href="#" className="text-[#333]">
            Riddha Bose
          </a>
          <time>2023-06-23 08:02</time>
        </p>
        <p className="">
          Putin is still very much in power, but Wagner’s uprising showed the
          cracks in the regime.
        </p>
      </div>
    </div>
  );
};

export default Post;
