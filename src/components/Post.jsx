import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ title, summary, cover, createdAt, author, postId }) => {
  return (
    <Link
      to={`/post/${author.username}/${postId}`}
      className="post grid lg:grid-cols-[.9fr_1.1fr] lg:gap-[20px] lg:mb-7 lg:p-0 mb-5 p-5"
    >
      <div className="flex justify-center items-center">
        <img
          src={`http://localhost:4000/${cover}`}
          alt="cover image"
          className="max-w-[100%] md:mb-5 lg:mb-2 sm:mb-5 mb-5 rounded"
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
    </Link>
  );
};

export default Post;
