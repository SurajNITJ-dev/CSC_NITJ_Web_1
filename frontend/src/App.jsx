import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditProfilePage from './pages/EditProfilePage';

import MemberManagement from "./pages/MemberManagement";
import EventManager from "./pages/EventManager";
import BlogModeration from "./pages/BlogModeration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events.jsx";
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
import AdminPage from "./pages/admin.jsx"; // Ensure lowercase 'a' matches your file

const ProtectedRoute = ({ element }) => {
  const storedUser = localStorage.getItem("user");
  const directRole = localStorage.getItem("role");
  
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ Log the values to the console so you can see them live
  console.log("--- SECURITY CHECK ---");
  console.log("Direct Role Key:", directRole);
  console.log("Role inside User Object:", user?.role);

  const userRole = directRole || user?.role;

  if (!user || userRole !== "admin") {
    console.warn("❌ ACCESS DENIED: Required 'admin', found:", userRole);
    return <Navigate to="/" replace />;
  }

  console.log("✅ ACCESS GRANTED");
  return element;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false); // ✅ Stop loading once check is done
  }, []);

  // Show nothing or a spinner until we know the user's role
  if (isLoading) {
    return <div className="bg-[#010714] min-h-screen flex items-center justify-center text-cyan-400 font-mono italic animate-pulse">Initializing Security Protocol...</div>;
  }

const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ 2. Pass the full user object (including role) back to App.jsx
      // This solves the "onLogin is not defined" error
      onLogin(data); 

      // ✅ 3. Navigate based on role immediately
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/team" element={<TeamsPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED USER ROUTES - Add 'user' prop here! */}
        <Route 
          path="/profile" 
          element={isLoggedIn ? <Profile onLogout={handleLogout} user={user} /> : <Navigate to="/login" />} 
        />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/create-blog" element={<CreateBlog />} />

        {/* 🔒 SECURE ADMIN ROUTES */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<AdminPage />} user={user} />} 
        />
        <Route 
          path="/admin/blogs" 
          element={<ProtectedRoute element={<BlogModeration />} user={user} />} 
        />
        <Route 
          path="/admin/events" 
          element={<ProtectedRoute element={<EventManager />} user={user} />} 
        />
        <Route 
          path="/admin/members" 
          element={<ProtectedRoute element={<MemberManagement />} user={user} />} 
        />

        {/* REDIRECT ANY UNKNOWN PATH TO HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;