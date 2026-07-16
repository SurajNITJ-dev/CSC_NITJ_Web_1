import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blog" },
];

const exploreItems = [
  {
    name: "Education",
    desc: "Learning tracks & workshops",
    path: "/education",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Cyber Awareness",
    desc: "Digital self-defense guides",
    path: "/awareness",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: "Competitions",
    desc: "CTFs & global platforms",
    path: "/competitions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Navbar({ isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const exploreRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setExploreOpen(false);
    setMobileExploreOpen(false);
  }, [location.pathname]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close explore dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isExploreActive = exploreItems.some((item) => isActive(item.path));

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#020617]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,209,255,0.06)] border-b border-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-5">

          {/* ── LOGO ── */}
          <Link
            to="/"
            className="relative text-white font-black text-2xl italic z-[60] shrink-0 group"
          >
            <span className="relative">
              CSC
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,209,255,0.5)]">
                NITJ
              </span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00D1FF] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* ── DESKTOP NAV: PILL CONTAINER ── */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl rounded-full px-3 py-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_12px_rgba(0,209,255,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
                  )}
                </Link>
              ))}

              {/* ── EXPLORE DROPDOWN TRIGGER ── */}
              <div
                ref={exploreRef}
                className="relative"
              >
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                    isExploreActive || exploreOpen
                      ? "bg-cyan-500/15 text-cyan-400 shadow-[inset_0_0_12px_rgba(0,209,255,0.15)]"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {isExploreActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
                  )}
                </button>

                {/* ── EXPLORE DROPDOWN PANEL ── */}
                <div
                  className={`absolute top-full right-0 mt-3 w-72 rounded-2xl overflow-hidden transition-all duration-300 origin-top-right ${
                    exploreOpen
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Glow border */}
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent rounded-2xl blur-[1px]" />

                  <div className="relative bg-[#0a1628]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-2">
                    {exploreItems.map((item, idx) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`group/item flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-slate-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        {/* Icon circle */}
                        <div
                          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isActive(item.path)
                              ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(0,209,255,0.2)]"
                              : "bg-white/[0.06] text-slate-400 group-hover/item:bg-cyan-500/15 group-hover/item:text-cyan-400"
                          }`}
                        >
                          {item.icon}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold tracking-wide group-hover/item:text-cyan-400 transition-colors duration-300">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── DESKTOP AUTH BUTTONS ── */}
          <div className="hidden md:flex items-center gap-5">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-white text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group relative flex items-center gap-2 px-5 py-2.5 bg-cyan-400 text-[#020617] text-[13px] font-black uppercase tracking-[0.15em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get Started</span>
                  <span className="relative text-sm transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
              </>
            ) : (
              <Link
                to="/profile"
                className="group relative w-10 h-10 rounded-full border-2 border-cyan-500/40 flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-300" />
                <span className="text-base">👤</span>
              </Link>
            )}
          </div>

          {/* ── MOBILE: HAMBURGER BUTTON ── */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-[60] focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${
                open ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── MOBILE: OVERLAY BACKDROP ── */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ── MOBILE: SIDE DRAWER ── */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-[#020617] border-r border-cyan-500/10 z-[58] md:hidden transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[5px_0_40px_rgba(0,0,0,0.8)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Drawer Header */}
        <div className="px-7 pt-8 pb-6 border-b border-white/5">
          <Link to="/" onClick={() => setOpen(false)} className="text-white font-black text-xl italic">
            CSC<span className="text-cyan-400">NITJ</span>
          </Link>
          <p className="text-[9px] text-cyan-500/50 font-mono uppercase tracking-[0.3em] mt-2">
            Cyber Security Club
          </p>
        </div>

        {/* Drawer Nav Links */}
        <div className="px-5 py-6 flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                isActive(link.path)
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {isActive(link.path) && (
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
              )}
              {link.name}
            </Link>
          ))}

          {/* ── MOBILE: EXPLORE SECTION ── */}
          <button
            onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 w-full ${
              isExploreActive || mobileExploreOpen
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <span className="flex items-center gap-3">
              {isExploreActive && (
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]" />
              )}
              Explore
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 h-3 transition-transform duration-300 ${
                mobileExploreOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Explore Sub-items */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              mobileExploreOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-4 flex flex-col gap-1 py-1">
              {exploreItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive(item.path)
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-white/[0.06] text-slate-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wide">{item.name}</span>
                    <span className="text-[9px] text-slate-500">{item.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 border-t border-white/5">
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-center py-3 text-slate-400 text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-cyan-400 text-[#020617] font-black text-xs uppercase tracking-[0.15em] rounded-xl hover:shadow-[0_0_20px_rgba(0,209,255,0.35)] transition-all"
              >
                Get Started <span>→</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.15em]"
            >
              <span className="w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center">
                👤
              </span>
              My Profile
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
