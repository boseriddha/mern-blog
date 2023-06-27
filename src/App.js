import "./App.css";
import Page from "./components/Page";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Page />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
