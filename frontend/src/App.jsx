import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfilePage from './pages/EditProfilePage';

import MemberManagement from "./pages/MemberManagement";
import EventManager from "./pages/EventManager";
import BlogModeration from "./pages/BlogModeration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";            // ✅ ADD
import Education from "./pages/education";
import Awareness from "./pages/awareness";
import Competitions from "./pages/competition";
import TeamsPage from "./pages/team";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* USER */
import Profile from "./pages/ProfilePage";
import CreateBlog from "./pages/CreateBlog";

/* ADMIN */
import AdminPage from "./pages/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("token", "always-logged-in");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} /> {/* ✅ EVENTS */}
        <Route path="/team" element={<TeamsPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* CREATE BLOG */}
        <Route path="/create-blog" element={<CreateBlog />} />

        {/* AUTH */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile onLogout={handleLogout} />}
        />
        <Route path="/edit-profile" element={<EditProfilePage />} />

        {/* HASH PAGES (LEGACY) */}
        <Route path="/#education" element={<Education />} />
        <Route path="/#awareness" element={<Awareness />} />
        <Route path="/#competitions" element={<Competitions />} />

        {/* 🔓 ADMIN (TEMP — NO AUTH) */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/blogs" element={<BlogModeration />} />
        <Route path="/admin/events" element={<EventManager />} />
        <Route path="/admin/members" element={<MemberManagement />} />


      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
