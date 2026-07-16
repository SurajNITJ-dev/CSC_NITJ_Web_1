import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import backgroundImage from '../assets/clublogo.png';
import VikashImg from '../assets/vikash.png';
import KritikaImg from '../assets/kritika.png';
import DhruvSImg from '../assets/dhruv_sagar.png';
import cscLogo from '../assets/clublogo.png';


// Faculty Imports
import HarshImg from '../assets/harsh_sir.png';
import SamayImg from '../assets/samayveer_sir.png';
import KPImg from '../assets/kp_sir.png';
import UrvashiImg from '../assets/urvashi_mam.png';

/* ─────────────────────────────────────────────
   FLOATING PARTICLES BACKGROUND
   ───────────────────────────────────────────── */
const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.fontSize = Math.random() * 10 + 7; // Size between 7px and 17px
        this.speedY = -(Math.random() * 0.25 + 0.05); // Float upwards
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.25 + 0.05; // Soft opacity
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < -20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
          this.value = Math.random() > 0.5 ? '1' : '0';
        }
      }
      draw() {
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillStyle = `rgba(0, 209, 255, ${this.opacity})`;
        ctx.fillText(this.value, this.x, this.y);
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width / 15), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', () => { resize(); init(); });
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

/* ─────────────────────────────────────────────
   CYBER CARD (Must Haves Section)
   ───────────────────────────────────────────── */
const CyberCard = ({ title, desc, icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative h-full"
    >
      {/* Glow outer border */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/20 to-transparent rounded-2xl opacity-40 group-hover:opacity-100 transition-all duration-500 blur-[2px]" />
      
      {/* Main card body */}
      <div className="relative h-full bg-[#0a1628]/60 backdrop-blur-md border border-cyan-500/10 hover:border-cyan-500/30 p-8 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 group-hover:translate-y-[-4px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Top visual decoration */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div>
          {/* Icon wrapper */}
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300 mb-6">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {desc}
          </p>
        </div>

        {/* Technical dot indicator */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
          <span className="text-[10px] font-mono text-cyan-500/30 tracking-[0.2em]">SYS_ACTIVE //</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#00D1FF] transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};


/* ─────────────────────────────────────────────
   BINARY PARTICLES (CSS-driven, fly outward)
   ───────────────────────────────────────────── */
const BinaryParticles = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      distance: 150 + Math.random() * 650,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 5,
      value: Math.random() > 0.5 ? '1' : '0',
      size: 10 + Math.random() * 18,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 animate-[pulse_4s_ease-in-out_infinite]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-1/2 left-1/2 font-mono font-bold text-cyan-400/60 drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]"
          style={{
            fontSize: `${p.size}px`,
            animation: `binaryFlyOut ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--angle': `${p.angle}deg`,
            '--dist': `${p.distance}px`,
          }}
        >
          {p.value}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DYNAMIC 3D CYBER SPHERE (Live CSS Orb)
   ───────────────────────────────────────────── */
const CyberSphere = () => (
  <div className="relative w-72 h-72 md:w-[360px] md:h-[360px] flex items-center justify-center">
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      {/* Outer spinning orbital ring */}
      <div
        className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[spin_18s_linear_infinite]"
        style={{ transform: 'rotateX(70deg) rotateZ(0deg)' }}
      />
      {/* Inner spinning orbital ring (reverse) */}
      <div
        className="absolute inset-4 rounded-full border border-cyan-400/20 animate-[spin_12s_linear_reverse_infinite]"
        style={{ transform: 'rotateX(70deg) rotateZ(45deg)' }}
      />
      {/* Core glowing sphere */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-800 shadow-[0_0_80px_rgba(0,209,255,0.4)] animate-[pulse_3s_ease-in-out_infinite]" />
      {/* Metallic conic gradient overlay (spinning) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(0,209,255,0.4) 0%, transparent 30%, rgba(0,180,220,0.3) 60%, transparent 80%, rgba(0,209,255,0.4) 100%)',
          animation: 'spin 8s linear infinite',
        }}
      />
      {/* Inner glow bloom */}
      <div className="absolute inset-16 rounded-full bg-cyan-400/70 blur-xl animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
      {/* Equator ring */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="w-full h-8 rounded-full border-2 border-cyan-400/40"
          style={{
            transform: 'rotateX(75deg)',
            background: 'linear-gradient(90deg, rgba(0,209,255,0.2), rgba(0,100,150,0.1), rgba(0,209,255,0.2))',
          }}
        />
      </div>
      {/* Binary particles flying outward */}
      <BinaryParticles />
      {/* CSC Logo centered on top */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <img
          src={cscLogo}
          alt="CSC Logo"
          className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-[0_0_20px_rgba(0,209,255,0.5)] z-30"
        />
      </div>
    </div>
  </div>
);


/* ─────────────────────────────────────────────
   HOME PAGE Component
   ───────────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Typewriter states
  const [vikashText, setVikashText] = useState("");
  const [kritikaText, setKritikaText] = useState("");

  const vikashFullMsg = "In cybersecurity, the only limit is your curiosity. We built CSC to cultivate a mindset that questions how systems work. Keep exploring, keep breaking things (ethically), and never stop learning.";
  const kritikaFullMsg = "Technology is powerful, but community is what drives innovation. My vision for CSC is a space where collaboration thrives—where beginners and experts alike come together to secure the digital future.";

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 100);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setScrollProgress((currentScroll / scrollHeight) * 100);
    };
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Founders Typewriter Animation
  const foundersRef = useRef(null);
  const isFoundersInView = useInView(foundersRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isFoundersInView) return;
    let vIndex = 0, kIndex = 0;
    const speed = 25;
    const timer = setInterval(() => {
      if (vIndex <= vikashFullMsg.length) { setVikashText(vikashFullMsg.slice(0, vIndex)); vIndex++; }
      if (kIndex <= kritikaFullMsg.length) { setKritikaText(kritikaFullMsg.slice(0, kIndex)); kIndex++; }
      if (vIndex > vikashFullMsg.length && kIndex > kritikaFullMsg.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [isFoundersInView]);

  const facultyMentors = [
    { name: "Dr Harsh Kumar Verma", role: "Faculty Mentor", img: HarshImg, msg: "Guiding students to think critically about cybersecurity challenges and encouraging ethical research-driven exploration." },
    { name: "Dr Samayveer Singh", role: "Faculty Mentor", img: SamayImg, msg: "Focused on building strong technical foundations and promoting responsible use of security tools and practices." },
    { name: "Dr. K P Sharma", role: "Faculty Mentor", img: KPImg, msg: "Motivating students to innovate in secure system design with discipline, precision, and academic rigor." },
    { name: "Dr Urvashi Bansal", role: "Faculty Mentor", img: UrvashiImg, msg: "Encouraging collaborative learning and fostering a research-oriented mindset in cybersecurity domains." }
  ];

  const mustHaves = [
    {
      title: "CTF Training",
      desc: "Hands-on Capture The Flag sessions with progressive difficulty and expert mentorship to tackle real challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    },
    {
      title: "Live Workshops",
      desc: "Real-time interactive workshops focusing on penetration testing, malware analysis, reverse engineering and defense mechanisms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: "Threat Research",
      desc: "A dedicated cell monitoring latest vulnerabilities, intelligence reports, CVE tracking, and crafting cyber advisories.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Community Hub",
      desc: "Connect with ethical hackers, coordinate security events, share detailed writeups and collaboratively build open security projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const features = [
    { label: "Web based", num: "01" },
    { label: "Collaborative", num: "02" },
    { label: "Real-time", num: "03" },
  ];

  // In-view hooks for sections
  const mustHavesRef = useRef(null);
  const isMustHavesInView = useInView(mustHavesRef, { once: true, margin: "-100px" });

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const defendersRef = useRef(null);
  const isDefendersInView = useInView(defendersRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
        <div
          className="h-full bg-cyan-400 shadow-[0_0_15px_#00D1FF] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen overflow-hidden">
        
        {/* Radial glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-cyan-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

        {/* ── HUGE TITLE (Absolute Top Center) ── */}
        <div className={`absolute top-20 left-0 right-0 z-10 pt-8 flex justify-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-[clamp(4.5rem,15vw,14rem)] font-black leading-[0.9] tracking-tighter uppercase select-none text-center">
            <span className="text-white">CSC </span>
            <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(0,209,255,0.4)]">NITJ</span>
            <span className="text-white text-[0.6em]">.</span>
          </h1>
        </div>

        {/* ── CENTER: DYNAMIC BREATHING SPHERE (Absolute Center) ── */}
        <div className={`absolute inset-0 flex items-center justify-center z-20 mt-36 md:mt-44 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <CyberSphere />
        </div>

        {/* ── BOTTOM LEFT (Absolute Bottom Left) ── */}
        <div className={`absolute bottom-10 left-6 md:left-12 z-30 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Active Members + Tagline */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[VikashImg, KritikaImg, DhruvSImg].map((img, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#020617] overflow-hidden bg-slate-800"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <span className="text-2xl font-black text-white">200+</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Active Members</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Pioneering the future of secure systems and ethical hacking protocols.
            </p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM CENTER: CTA (Absolute Bottom Center) ── */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-4 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[10px] text-cyan-500/50 font-mono uppercase tracking-[0.4em]">
            Building Cyber Awareness & Ethical Hacking Skills
          </p>
        </div>

        {/* ── BOTTOM RIGHT (Absolute Bottom Right) ── */}
        <div className={`absolute bottom-10 right-6 md:right-12 z-30 flex flex-col items-end gap-5 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-end gap-2 text-right">
            {[['Web based', '/01'], ['Collaborative', '/02'], ['Real-time', '/03']].map(
              ([label, num]) => (
                <p key={num} className="text-xs text-slate-400">
                  <span className="text-slate-400">{label}</span>
                  <span className="text-cyan-500/80 ml-2 font-mono">{num}</span>
                </p>
              )
            )}
          </div>

          <button
            onClick={() => navigate('/about')}
            className="group flex items-center gap-3 mt-2"
          >
            <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(0,209,255,0.3)] group-hover:shadow-[0_0_35px_rgba(0,209,255,0.5)] group-hover:scale-110 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#020617] group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">How it</span>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">works?</span>
            </div>
          </button>
        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" />
      </div>

      {/* ═══════════════════════════════════════════
          2. MUST HAVES SECTION (From Reference)
          ═══════════════════════════════════════════ */}
      <section ref={mustHavesRef} className="relative z-10 py-28 px-6 bg-black/10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMustHavesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              All the must haves of a <br />
              premier <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">cyber club.</span>
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mustHaves.map((item, idx) => (
              <CyberCard
                key={idx}
                title={item.title}
                desc={item.desc}
                icon={item.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* ═══════════════════════════════════════════
          3. STATS BANNER + LATEST ACTIVITY (From Reference)
          ═══════════════════════════════════════════ */}
      <section ref={statsRef} className="relative z-10 py-24 px-6 bg-black/20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Stats Glassmorphic Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-r from-cyan-950/20 via-[#0a1628]/80 to-cyan-950/20 border border-cyan-500/20 rounded-[2rem] p-10 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.6)] mb-24 overflow-hidden"
          >
            {/* Glowing accents inside stats box */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-cyan-500/10">
              <div className="flex flex-col justify-center py-4 md:py-0">
                <span className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,209,255,0.3)]">200+</span>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mt-2">Members</span>
              </div>
              <div className="flex flex-col justify-center pt-8 md:pt-0 py-4 md:py-0">
                <span className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,209,255,0.3)]">30+</span>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mt-2">Events Hosted</span>
              </div>
              <div className="flex flex-col justify-center pt-8 md:pt-0 py-4 md:py-0">
                <span className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,209,255,0.3)]">15+</span>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mt-2">CTFs Won</span>
              </div>
              <div className="flex flex-col justify-center pt-8 md:pt-0 py-4 md:py-0">
                <span className="text-4xl md:text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(0,209,255,0.3)]">50+</span>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mt-2">Alumni Network</span>
              </div>
            </div>
          </motion.div>

          {/* Latest Activity Info Banner */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mt-8">
            <div className="flex flex-col max-w-lg text-center md:text-left">
              <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-[0.3em] mb-2">Latest Activity //</span>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Stay ahead of the <br />
                <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">threat landscape.</span>
              </h3>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/events')}
                className="group relative px-6 py-3.5 bg-cyan-400 text-[#020617] text-[11px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="relative flex items-center gap-2">
                  View Events
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                </span>
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="px-6 py-3.5 bg-transparent border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,209,255,0.1)]"
              >
                Read Blog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* ═══════════════════════════════════════════
          4. NEXT-GEN DEFENDERS SECTION (From Reference)
          ═══════════════════════════════════════════ */}
      <section ref={defendersRef} className="relative z-10 py-28 px-6 bg-black/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isDefendersInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Building India's <br />
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">next-gen</span> cyber defenders.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              The Cyber Security Club of NIT Jalandhar was founded to create a community of passionate security researchers. We run CTF teams, host workshops, and mentor the next generation of ethical hackers to safeguard modern cyber infrastructures.
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate('/about')}
                className="group relative px-6 py-3 bg-cyan-400 text-[#020617] text-[11px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              >
                Learn More
              </button>
              <button
                onClick={() => navigate('/team')}
                className="px-6 py-3 bg-transparent border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300"
              >
                Meet the Team
              </button>
            </div>
          </motion.div>

          {/* Right vertical cards list */}
          <div className="flex flex-col gap-5">
            {[
              {
                title: "Ethical Hacking",
                desc: "Learn offensive security techniques in a legal, structured environment.",
                badge: "OFFSEC //",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Open Source",
                desc: "All our research and tools are open source and community-driven.",
                badge: "OPEN_SRC //",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: "Knowledge Sharing",
                desc: "Weekly writeups, talks, and reading groups to keep everyone sharp.",
                badge: "RESEARCH //",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isDefendersInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative bg-[#0a1628]/40 hover:bg-[#0a1628]/70 border border-cyan-500/10 hover:border-cyan-500/20 p-6 rounded-2xl flex gap-4 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {card.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <span className="text-[8px] font-mono text-cyan-500/40 tracking-wider">
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* ═══════════════════════════════════════════
          5. LEVEL UP / BOTTOM CTA BANNER (From Reference)
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 bg-black/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-r from-cyan-400 to-[#22d3ee] text-[#020617] rounded-[2.5rem] p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_50px_rgba(0,209,255,0.2)] overflow-hidden">
            
            {/* Shimmer sweep anim */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_5s_infinite_linear]" />

            <div className="flex flex-col max-w-lg text-center md:text-left z-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                Ready to level up <br />
                your security skills?
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 z-10 w-full sm:w-auto">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-[#020617] text-white hover:text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-105"
              >
                Join CSC NITJ →
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="px-8 py-4 bg-transparent border border-[#020617]/20 hover:border-[#020617]/50 hover:bg-[#020617]/5 text-[#020617] text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300"
              >
                Read Blog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" style={{ animationDelay: '1.8s' }} />
      </div>

      {/* ═══════════════════════════════════════════
          6. FACULTY MENTORS (Placed Below Reference Sections)
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-32 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-cyan-400 text-5xl md:text-7xl font-black italic uppercase mb-24 tracking-tighter drop-shadow-[0_0_15px_rgba(0,209,255,0.2)]">
            Faculty Mentors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {facultyMentors.map((faculty, idx) => (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative w-40 h-40 p-1 rounded-full border-2 border-cyan-500/30 bg-[#020617] shadow-[0_0_15px_rgba(0,209,255,0.15)] mb-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)]">
                  <img
                    src={faculty.img}
                    className="w-full h-full object-cover rounded-full"
                    alt={faculty.name}
                  />
                </div>

                <h3 className="text-cyan-400 text-xl font-bold tracking-wider">{faculty.name}</h3>
                <p className="text-gray-500 uppercase text-[9px] font-bold tracking-[0.4em] mt-2">{faculty.role}</p>

                <div className="mt-6 w-full bg-black/60 p-6 rounded-lg text-left border border-cyan-400/20 shadow-[0_0_15px_rgba(0,209,255,0.15)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)] hover:border-cyan-400/40">
                  <p className="text-gray-300 text-sm leading-relaxed">{faculty.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Neon Divider ── */}
      <div className="relative h-[2px] w-full bg-cyan-500/[0.08] overflow-hidden z-10">
        <div className="absolute top-0 h-full w-[30%] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-[slide_3s_linear_infinite]" style={{ animationDelay: '2.1s' }} />
      </div>

      {/* ═══════════════════════════════════════════
          7. OUR FOUNDERS (Placed Below Faculty Section)
          ═══════════════════════════════════════════ */}
      <section ref={foundersRef} id="founders" className="relative z-10 py-32 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-cyan-400 text-5xl md:text-7xl font-black italic uppercase mb-24 tracking-tighter drop-shadow-[0_0_15px_rgba(0,209,255,0.2)]">
            Our Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vikash */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 p-1 rounded-full border-2 border-cyan-500/30 bg-[#020617] shadow-[0_0_15px_rgba(0,209,255,0.15)] mb-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)]">
                <img src={VikashImg} className="w-full h-full object-cover rounded-full" style={{ objectPosition: '50% 20%' }} alt="Vikash" />
              </div>
              <h3 className="text-cyan-400 text-2xl font-bold tracking-wider">Vikash Kushwah</h3>
              <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.4em] mt-2">Founder / Coordinator</p>
              <div className="mt-6 w-full bg-[#0a1628]/60 p-6 rounded-lg border border-cyan-500/20 font-mono text-left relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30" />
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  <span className="text-cyan-400 mr-2 font-bold">{'>'}</span>
                  {vikashText}
                  <span className="animate-pulse bg-cyan-400 ml-1 inline-block w-2 h-4 align-middle" />
                </p>
              </div>
            </div>

            {/* Kritika */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 p-1 rounded-full border-2 border-cyan-500/30 bg-[#020617] shadow-[0_0_15px_rgba(0,209,255,0.15)] mb-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)]">
                <img src={KritikaImg} className="w-full h-full object-cover rounded-full" style={{ objectPosition: '50% 15%' }} alt="Kritika" />
              </div>
              <h3 className="text-cyan-400 text-2xl font-bold tracking-wider">Kritika Joshi</h3>
              <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.4em] mt-2">Founder / Coordinator</p>
              <div className="mt-6 w-full bg-[#0a1628]/60 p-6 rounded-lg border border-cyan-500/20 font-mono text-left relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30" />
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  <span className="text-cyan-400 mr-2 font-bold">{'>'}</span>
                  {kritikaText}
                  <span className="animate-pulse bg-cyan-400 ml-1 inline-block w-2 h-4 align-middle" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes slide {
          0% { left: -30%; }
          100% { left: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Home;