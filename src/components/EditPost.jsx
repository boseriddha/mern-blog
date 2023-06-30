import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { author, id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${author}/${id}`).then((response) => {
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setCover(data.cover);
      });
    });
  }, []);

  if (redirect) {
    return <Navigate to={`/post/${author}/${id}`} />;
  }

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files?.[0]);
    data.set("postId", id);
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (!response.ok) {
      alert("error");
    } else {
      setRedirect(true);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
      />
      <input
        type="text"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
        className="block w-[100%] p-2 mb-[10px] border border-solid border-[#ddd] rounded-[5px]"
      />
      <div className="mb-4 p-2 w-[100%] border border-solid border-[#ddd] rounded-[5px] overflow-auto">
        <img src={`http://localhost:4000/${cover}`} alt="cover-image" />
        <p>{cover}</p>
      </div>
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        className="mb-[10px]"
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={setContent}
      />
      <button className="lg:w-[10%] w-[100%] p-2 block rounded-[5px] bg-[#555] text-white mt-[10px]">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
