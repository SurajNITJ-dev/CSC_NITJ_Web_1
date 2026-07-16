import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

/* ---------- DYNAMIC STARLIGHT PARTICLES ---------- */
const RegisterBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fade = Math.random() * 0.005 + 0.002;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fade;
        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
          this.y = canvas.height;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 209, 255, ${this.opacity})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#00d1ff";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 20), 60);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // backend base url (env based)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // basic frontend checks
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!email.trim().endsWith("@nitj.ac.in")) {
      setError("Email must end with @nitj.ac.in");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      // registration successful → login page
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-start justify-center bg-[#020617] px-4 overflow-hidden pt-36 pb-16"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(3, 105, 161, 0.05) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)",
        backgroundSize: "100%, 20px 20px, 20px 20px"
      }}
    >
      {/* Background elements */}
      <RegisterBackground />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/[0.06] rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Main card box */}
      <div className="relative w-full max-w-[440px] z-10">
        
        {/* Glow border sweep */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-cyan-500/30 rounded-2xl opacity-50 blur-[3px]" />

        {/* Form panel */}
        <form
          onSubmit={handleRegister}
          className="relative bg-[#050b14]/90 backdrop-blur-3xl border border-cyan-500/20 pt-14 pb-10 px-8 md:px-10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col"
        >
          {/* Cyber HUD Brackets */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl pointer-events-none" />

          {/* Top aesthetic glow line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Title Header */}
          <div className="mb-8 text-center mt-4">
            <h1 className="text-3xl font-black italic uppercase tracking-wider text-white">
              Terminal <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">Register</span>
            </h1>
            <p className="text-slate-500 text-[9px] font-bold tracking-[0.4em] uppercase mt-2">
              // New User Initialization
            </p>
          </div>

          {/* Inputs Section */}
          <div className="space-y-4 mb-6">
            
            {/* Name Field */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-cyan-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#020617]/85 border border-white/5 hover:border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] rounded-xl py-3.5 pl-11 pr-4 text-white text-xs font-mono transition-all duration-300 outline-none placeholder:text-slate-600"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-cyan-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="student@nitj.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617]/85 border border-white/5 hover:border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] rounded-xl py-3.5 pl-11 pr-4 text-white text-xs font-mono transition-all duration-300 outline-none placeholder:text-slate-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-cyan-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020617]/85 border border-white/5 hover:border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] rounded-xl py-3.5 pl-11 pr-4 text-white text-xs font-mono transition-all duration-300 outline-none placeholder:text-slate-600"
                required
              />
            </div>

          </div>

          {/* Error Banner */}
          {error && (
            <div className="text-red-400 text-[10px] font-bold tracking-widest uppercase bg-red-500/5 border border-red-500/20 p-3 rounded-xl mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-[#020617] font-black py-4 rounded-xl text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,209,255,0.2)] hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#020617] border-t-transparent rounded-full animate-spin" />
                <span>INITIALIZING...</span>
              </>
            ) : (
              <span>CREATE ACCOUNT</span>
            )}
          </button>

          {/* Decorative Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-white/5"></div>
            <span className="text-slate-600 text-[8px] font-mono tracking-[0.3em] uppercase">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-white/5"></div>
          </div>

          {/* Alternate Navigation */}
          <div className="text-center">
            <p className="text-slate-500 text-xs mb-3">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-block text-cyan-400 hover:text-cyan-300 text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:scale-103"
            >
              Login Instead
            </Link>
          </div>
          
          {/* Bottom telemetry status decoration */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5 text-[8px] font-mono text-slate-600">
            <span>SECURE_REG // V3.2</span>
            <span>SYS_READY</span>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;