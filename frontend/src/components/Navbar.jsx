import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    location.pathname === path
      ? "text-cyan-400"
      : "text-slate-400 hover:text-white transition-colors";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur border-b border-slate-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* 1. Mobile Hamburger - Now on the left in mobile, hidden in desktop */}
          <button
            className="md:hidden text-cyan-400 text-3xl z-[60] focus:outline-none order-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>

          {/* 2. Logo - Centered or shifted based on flex logic, kept as order-2 for mobile */}
          <Link to="/" className="text-white font-black text-xl italic z-[60] order-2 md:order-1">
            CSC<span className="text-cyan-400">NITJ</span>
          </Link>

          {/* 3. Desktop menu - Hidden in mobile */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest md:order-2">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/about" className={isActive("/about")}>About</Link>
            <Link to="/team" className={isActive("/team")}>Team</Link>
            <Link to="/blog" className={isActive("/blog")}>Blog</Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500 hover:text-black transition"
              >
                Sign In
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-9 h-9 rounded-full border border-cyan-500 flex items-center justify-center text-cyan-400"
              >
                👤
              </Link>
            )}
          </div>

          {/* 4. Mobile Auth Button - Now on the right in mobile, hidden in desktop */}
          <div className="md:hidden z-[60] order-3">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-[10px] px-3 py-1.5 border border-cyan-500 text-cyan-400 rounded uppercase font-bold tracking-tighter"
              >
                Sign In
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full border border-cyan-500 flex items-center justify-center text-cyan-400"
              >
                👤
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu - Left Side Drawer (Changed from right-0 to left-0) */}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-[#020617] border-r border-slate-800 transform transition-transform duration-300 ease-in-out z-[55] shadow-2xl ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col gap-8 p-10 mt-20 text-sm font-bold uppercase tracking-[0.2em]">
            <Link to="/" className={isActive("/")}>Home</Link>
            <Link to="/about" className={isActive("/about")}>About</Link>
            <Link to="/team" className={isActive("/team")}>Team</Link>
            <Link to="/blog" className={isActive("/blog")}>Blog</Link>
          </div>
        </div>

        {/* Overlay Backdrop */}
        {open && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </nav>
    </>
  );
}