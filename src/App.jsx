import { useState } from "react";
import LoginPage from "./LoginPage.jsx";
import AdminPanel from "./AdminPanel.jsx";
import ScannerPage from "./ScannerPage.jsx";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLogin = (role, userData) => {
    setUser({ role, ...userData });
    setPage(role === "admin" ? "admin" : "scanner");
  };

  return (
    <div className="app">
      {page === "login" && <LoginPage onLogin={handleLogin} />}
      {page === "admin" && <AdminPanel onLogout={() => setPage("login")} />}
      {page === "scanner" && <ScannerPage onLogout={() => setPage
