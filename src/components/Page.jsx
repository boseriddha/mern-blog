import { useState, useEffect } from "react";
import Post from "./Post";

const Page = () => {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const response = fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</div>
  );
};

export default Page;
