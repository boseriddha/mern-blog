import "./App.css";
import Page from "./components/Page";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./hooks/userContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Page />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:author/:id" element={<SinglePost />} />
          <Route path="/edit/:author/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
