import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/clublogo.png";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaBlog,
  FaCalendarAlt,
  FaBookOpen,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Thin neon line on top */}
      <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent shadow-[0_0_20px_#00D1FF]" />

      <footer className="relative bg-[#020617] text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-14 mb-16">

            {/* Brand */}
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={handleScrollToTop} className="inline-block">
                <img
                  src={logo}
                  alt="CSC NITJ Logo"
                  className="w-20 object-contain drop-shadow-[0_0_15px_rgba(0,209,255,0.35)]"
                />
              </Link>
              <h2 className="text-xl font-extrabold tracking-tight mt-1">
                CSC <span className="text-[#00D1FF]">NITJ</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Cyber Security Club of NIT Jalandhar — building ethical hackers and secure developers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                {[
                  { name: "Home", path: "/", icon: <FaHome /> },
                  { name: "About", path: "/about", icon: <FaInfoCircle /> },
                  { name: "Team", path: "/team", icon: <FaUsers /> },
                  { name: "Blog", path: "/blog", icon: <FaBlog /> },
                ].map(({ name, path, icon }) => (
                  <li key={name}>
                    <Link to={path} onClick={handleScrollToTop} className="group flex items-center gap-3 w-fit">
                      <span className="opacity-80 group-hover:opacity-100 group-hover:text-[#00D1FF] transition-colors">
                        {icon}
                      </span>
                      <span className="relative inline-block">
                        <span className="group-hover:text-[#00D1FF] transition-colors">
                          {name}
                        </span>
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#00D1FF] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">
                Explore
              </h3>
              <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                {[
                  { name: "Events", path: "/events", icon: <FaCalendarAlt /> },
                  { name: "Education", path: "/education", icon: <FaBookOpen /> },
                  { name: "Awareness", path: "/awareness", icon: <FaShieldAlt /> },
                  { name: "Competitions", path: "/competitions", icon: <FaTrophy /> },
                ].map(({ name, path, icon }) => (
                  <li key={name}>
                    <Link to={path} onClick={handleScrollToTop} className="group flex items-center gap-3 w-fit">
                      <span className="opacity-80 group-hover:opacity-100 group-hover:text-[#00D1FF] transition-colors">
                        {icon}
                      </span>
                      <span className="relative inline-block">
                        <span className="group-hover:text-[#00D1FF] transition-colors">
                          {name}
                        </span>
                        <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#00D1FF] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-bold mb-6 tracking-wide text-gray-200">
                Connect
              </h3>
              <ul className="flex flex-col gap-5 text-gray-400 text-sm">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 hover:text-[#00D1FF] transition-colors w-fit">
                    <FaInstagram className="text-lg opacity-80 group-hover:opacity-100" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 hover:text-[#00D1FF] transition-colors w-fit">
                    <FaLinkedinIn className="text-lg opacity-80 group-hover:opacity-100" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 hover:text-[#00D1FF] transition-colors w-fit">
                    <FaGithub className="text-lg opacity-80 group-hover:opacity-100" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 hover:text-[#00D1FF] transition-colors w-fit">
                    <FaTwitter className="text-lg opacity-80 group-hover:opacity-100" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-[11px] tracking-[0.15em] uppercase">
              © {currentYear} CSC NITJ • Built with ⚡ by the Cyber Team
            </p>
            <span className="text-[10px] font-mono text-cyan-500/30 tracking-wider">
              // SECURING_THE_FUTURE
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
