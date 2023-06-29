import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    // console.log(files);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      setRedirect(true);
    }
    // console.log(await response.json());
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={createNewPost} enctype="multipart/form-data">
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
      <button className="w-[10%] p-2 block rounded-[5px] bg-[#555] text-white mt-[10px]">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
