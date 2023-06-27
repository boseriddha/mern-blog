import "./App.css";
// import Post from "./components/Post";
import Page from "./components/Page";
// import Header from "./components/Header";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Page />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
