import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../hooks/userContext";

const SinglePost = () => {
  const { author, id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${author}/${id}`).then((response) => {
      response.json().then((data) => {
        setPostInfo(data);
        // console.log(data);
      });
    });
  }, []);

  return (
    <div>
      {postInfo ? (
        <div>
          <div className="flex justify-center items-center">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
          </div>
          <h1 className="lg:text-4xl text-left text-3xl font-bold mt-10 md:text-justify">
            {postInfo.title}
          </h1>
          <div className="flex gap-3 items-center">
            <h6 className="font-bold lg:text-lg md:text-base sm:text-base mt-[10px] text-[#555]">
              {postInfo.author.username}
            </h6>
            <time className="italic mt-[10px] text-[#aaa]">
              {format(new Date(postInfo.createdAt), "dd MMMM, yyyy HH:mm")}
            </time>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
            className="mt-5 lg:text-lg md:text-base sm:text-base text-justify"
          />
          {userInfo.id === postInfo.author.authorId && (
            <Link
              className="w-[100%] block rounded-[5px] bg-[#555] text-white mt-5 flex items-center justify-center gap-2 p-2"
              to={`/edit/${postInfo.author.username}/${postInfo.postId}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <p className="mt-[2px]">Edit this post</p>
            </Link>
          )}
        </div>
      ) : (
        <div className="h-[100%] w-[100%] flex justify-center items-center">
          <h1 className="text-5xl my-auto">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
