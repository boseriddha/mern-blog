import { format } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post grid grid-cols-[.9fr_1.1fr] gap-[20px] mb-7">
      <div className="flex justify-center items-center">
        <img
          src={`http://localhost:4000/${cover}`}
          alt="cover image"
          className="max-w-[100%]"
        />
      </div>
      <div className="text">
        <h2 className="text-xl font-bold m-0">{title}</h2>
        <p className="my-[6px] mx-0 text-xs font-bold text-[#888] flex gap-[10px]">
          <a href="#" className="text-[#333]">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
