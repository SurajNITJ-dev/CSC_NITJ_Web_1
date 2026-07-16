import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import urvashiMam from '../assets/urvashi_mam.png';
import NeuralNetwork from '../components/NeuralNetwork';

// --- REUSABLE CARD COMPONENT (Updated with Prefix prop) ---
const GoalCard = ({ id, title, desc, active, path, prefix = "SEC" }) => {
  const handleNavigate = () => {
    if (active) {
      window.location.hash = path;
    }
  };

  return (
    <div
      className={`group relative transition-all transform ease-in-out ${active
          ? 'opacity-100 translate-y-0 scale-100 duration-700'
          : 'opacity-0 translate-y-8 scale-95 duration-300'
        }`}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/40 to-transparent rounded-[2.5rem] opacity-30 group-hover:opacity-100 transition-all duration-500 blur-[2px]" />
      <div className="relative h-full bg-[#0a1628]/90 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div
            className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] transition-all duration-[1200ms] ease-out"
            style={{ width: active ? '100%' : '0%' }}
          />
        </div>

        <div className="flex justify-between items-center mb-8 mt-2">
          <span className="font-mono text-[10px] text-cyan-500/80 tracking-[3px] bg-cyan-500/5 px-3 py-1 rounded-md border border-cyan-500/20">
            {prefix}_{id}
          </span>
          <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#22d3ee] ${active ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 group-hover:text-gray-300">
          {desc}
        </p>

        <button
          onClick={handleNavigate}
          disabled={!active}
          className={`mt-auto pt-6 border-t border-white/5 flex items-center gap-2 transition-all text-[10px] font-bold uppercase tracking-widest ${active
              ? 'text-cyan-500/70 group-hover:text-cyan-400 cursor-pointer'
              : 'text-gray-600 cursor-not-allowed'
            }`}
        >
          <div className="h-[1px] w-8 bg-current opacity-30 group-hover:w-12 transition-all" />
          {active ? (prefix === 'EVT' ? 'View Details' : 'Analyze Module') : 'Scanning...'}
        </button>
      </div>
    </div>
  );
};

const AboutPage = () => {
  // 1. Get the hash from the URL
  const { hash } = useLocation();

  // 2. Add the Scroll Listener
  useEffect(() => {
    if (hash) {
      // Remove the '#' and find the element (e.g., "events")
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // Timeout ensures the element is rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const [activeCycle, setActiveCycle] = useState(0);
  const [heroScanning, setHeroScanning] = useState(false);
  const [isCoordinatorExpanded, setIsCoordinatorExpanded] = useState(false);

  // --- 1. GOALS STATE ---
  const [goalsHeaderVisible, setGoalsHeaderVisible] = useState(false);
  const [visibleGoals, setVisibleGoals] = useState([false, false, false]);
  const goalsRef = useRef(null);

  // --- 2. EVENTS STATE ---
  const [eventsHeaderVisible, setEventsHeaderVisible] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState([false, false]); // Two events
  const eventsRef = useRef(null);

  const heroContent = [
    {
      title: "About CSC NITJ",
      desc: "The Cyber Security Club of NIT Jalandhar is a technical hub dedicated to elite skill-building. We bridge the gap between theoretical computing and defensive reality through hardcore technical immersion."
    },
    {
      title: "Our Mission",
      desc: "To forge a frontline of ethical hackers through offensive-defensive simulations, intensive workshops, and research-driven initiatives that tackle emerging global threats head-on."
    },
    {
      title: "Our Vision",
      desc: "To establish a premier cybersecurity ecosystem at NITJ where innovation meets ethics, fostering the next generation of digital guardians for a secure, resilient infrastructure."
    }
  ];

  // Hero Cycle Effect
  useEffect(() => {
    setHeroScanning(true);
    const heroInterval = setInterval(() => {
      setHeroScanning(false);
      setTimeout(() => {
        setActiveCycle((prev) => (prev + 1) % 3);
        setHeroScanning(true);
      }, 400);
    }, 3500);
    return () => clearInterval(heroInterval);
  }, []);

  // --- ANIMATION LOGIC: GOALS ---
  const startGoalsAnimation = () => {
    setGoalsHeaderVisible(false);
    setVisibleGoals([false, false, false]);
    setTimeout(() => setGoalsHeaderVisible(true), 300);
    setTimeout(() => setVisibleGoals([true, false, false]), 600);
    setTimeout(() => setVisibleGoals([true, true, false]), 900);
    setTimeout(() => setVisibleGoals([true, true, true]), 1200);
  };

  useEffect(() => {
    let intervalId;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startGoalsAnimation();
        intervalId = setInterval(startGoalsAnimation, 8000);
      } else {
        clearInterval(intervalId);
      }
    }, { threshold: 0.1 });

    if (goalsRef.current) observer.observe(goalsRef.current);
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  // --- ANIMATION LOGIC: EVENTS ---
  const startEventsAnimation = () => {
    setEventsHeaderVisible(false);
    setVisibleEvents([false, false]);
    setTimeout(() => setEventsHeaderVisible(true), 300);
    setTimeout(() => setVisibleEvents([true, false]), 600);
    setTimeout(() => setVisibleEvents([true, true]), 900);
  };

  useEffect(() => {
    let intervalId;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startEventsAnimation();
        // Slightly longer interval for events to keep them readable
        intervalId = setInterval(startEventsAnimation, 8000);
      } else {
        clearInterval(intervalId);
      }
    }, { threshold: 0.1 });

    if (eventsRef.current) observer.observe(eventsRef.current);
    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30">
      <NeuralNetwork />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-48 pb-20 px-6 flex flex-col items-center justify-center">
        <div
          className={`relative max-w-4xl w-full bg-[#0a1628]/70 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${heroScanning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-t-[3rem] overflow-hidden">
            <div
              className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] transition-all duration-[1200ms] ease-out"
              style={{ width: heroScanning ? '100%' : '0%' }}
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 uppercase">
              {heroContent[activeCycle].title.split(' ')[0]} <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                {heroContent[activeCycle].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl font-light tracking-wide italic min-h-[140px]">
              {heroContent[activeCycle].desc}
            </p>

            <div className="flex gap-3 mb-8 mt-4">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${activeCycle === i
                      ? 'bg-cyan-400 w-10 shadow-[0_0_12px_#22d3ee]'
                      : 'bg-gray-700 w-3'
                    }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500/40">
              <div className="h-[1px] w-12 bg-current opacity-20" />
              {heroScanning ? "Protocol Engaged" : "Syncing Core"}
              <div className="h-[1px] w-12 bg-current opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. FACULTY COORDINATOR MESSAGE SECTION */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-[0.3em] mb-3 inline-block">
            Administration / Guidance //
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-white/90">
            Coordinator's <span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Message</span>
          </h2>
          <div className="h-[2px] w-36 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4" />
        </div>

        <div className="relative">
          {/* Cyber outer border glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/20 via-transparent to-cyan-500/10 rounded-[2rem] opacity-40 blur-[2px]" />
          
          {/* Main Card */}
          <div className="relative bg-[#070f1e]/80 backdrop-blur-3xl border border-white/5 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500">
            
            {/* Cyber Corner HUD brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-[2rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-[2rem] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-[2rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-[2rem] pointer-events-none" />
            
            {/* Top aesthetic glow line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            {/* Left side accent glow line */}
            <div className="absolute top-8 left-0 bottom-8 w-[3px] bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent rounded-r" />

            {/* Quote Icon watermark */}
            <div className="absolute -top-6 -right-6 text-cyan-500/5 select-none font-sans text-[14rem] leading-none pointer-events-none font-black">
              ”
            </div>

            <div className="flex flex-col text-slate-300 text-sm md:text-base leading-relaxed font-light">
              
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase border-b border-white/5 pb-4 mb-5 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                Message from the Faculty Coordinator
              </h3>

              <p className="font-semibold text-slate-200 mb-4">
                Welcome to the Cyber Security Club (CSC), Department of Computer Science and Engineering, Dr. B. R. Ambedkar National Institute of Technology Jalandhar.
              </p>

              <p className="mb-4">
                The digital world offers limitless opportunities, but it also brings evolving cybersecurity challenges that demand skilled, ethical, and innovative professionals. The Cyber Security Club serves as a platform where students can strengthen their technical expertise, explore emerging security technologies, and develop practical problem-solving skills beyond the classroom.
              </p>

              <AnimatePresence initial={false}>
                {isCoordinatorExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-4"
                  >
                    <p>
                      Our vision is to create an engaging learning environment through workshops, hands-on training sessions, Capture The Flag (CTF) competitions, hackathons, expert lectures, research discussions, and industry interactions. These activities are designed to encourage curiosity, teamwork, innovation, and responsible cybersecurity practices while preparing students for academic research, competitive examinations, and professional careers.
                    </p>

                    <p>
                      I encourage every student to actively participate, collaborate with fellow enthusiasts, and make the most of the opportunities offered by the club. Together, we can build a vibrant cybersecurity community that contributes to a safer and more secure digital ecosystem.
                    </p>

                    <p>
                      I appreciate the dedication and enthusiasm of our student members and executive team in making this initiative successful. I look forward to witnessing the club grow into a center of excellence for cybersecurity learning, innovation, and leadership.
                    </p>

                    <p>
                      Wishing the Cyber Security Club continued success in all its endeavors.
                    </p>

                    {/* Signature block with Photo */}
                    <div className="border-t border-white/5 pt-6 mt-4 flex justify-between items-center flex-wrap gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0 group">
                          {/* Photo glow border ring */}
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-[4px] opacity-40 group-hover:opacity-85 transition-opacity duration-300" />
                          <img 
                            src={urvashiMam} 
                            alt="Dr. Urvashi Bansal" 
                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-cyan-400/40 object-cover shadow-[0_0_15px_rgba(0,209,255,0.15)]"
                          />
                        </div>
                        <div className="flex flex-col font-mono text-[11px] text-slate-400">
                          <span className="text-white text-base font-bold italic tracking-wide font-sans mb-0.5">Dr. Urvashi Bansal</span>
                          <span className="text-cyan-400 font-bold tracking-wider mb-0.5 text-xs">Faculty Coordinator, Cyber Security Club</span>
                          <span>Assistant Professor</span>
                          <span>Department of Computer Science & Engineering</span>
                          <span>Dr. B. R. Ambedkar National Institute of Technology Jalandhar</span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 font-mono tracking-widest bg-cyan-500/5 border border-cyan-500/10 px-3 py-1.5 rounded uppercase">
                        protocol // csc_exec_coord
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Read More / Read Less trigger CTA */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setIsCoordinatorExpanded(!isCoordinatorExpanded)}
                  className="group relative px-6 py-2.5 bg-cyan-500/5 hover:bg-cyan-500/15 border border-cyan-400/20 hover:border-cyan-400/50 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(0,209,255,0.15)] flex items-center gap-2"
                >
                  <span>{isCoordinatorExpanded ? "Read Less" : "Read More"}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isCoordinatorExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL GOALS SECTION */}
      <section id="goals" ref={goalsRef} className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto">
        <div className={`flex flex-col items-center mb-24 text-center transition-all transform ${goalsHeaderVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-5 duration-300'
          }`}>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/90">
            Operational <span className="text-cyan-500">Goals</span>
          </h2>
          <div className="h-1 w-48 md:w-64 bg-cyan-500 mt-6 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <GoalCard
            active={visibleGoals[0]}
            id="001"
            title="Education"
            desc="Hands-on exposure through workshops, events, and technical sessions focusing on real-world security projects."
            path="/#education"
            prefix="SEC"
          />
          <GoalCard
            active={visibleGoals[1]}
            id="002"
            title="Awareness"
            desc="Developing a strong cybersecurity culture and building digital resilience through shared knowledge."
            path="/#awareness"
            prefix="SEC"
          />
          <GoalCard
            active={visibleGoals[2]}
            id="003"
            title="Innovation"
            desc="Encouraging research-driven solutions and ethical hacking practices to defend global digital infrastructures."
            path="/#competitions"
            prefix="SEC"
          />
        </div>
      </section>

      {/* 3. OUR EVENTS SECTION (Moved from Home) */}
      <section id="events" ref={eventsRef} className="relative z-10 pt-16 pb-32 px-6 max-w-7xl mx-auto">
        <div className={`flex flex-col items-center mb-24 text-center transition-all transform ${eventsHeaderVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-5 duration-300'
          }`}>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/90">
            Our <span className="text-cyan-500">Events</span>
          </h2>
          <div className="h-1 w-48 md:w-64 bg-cyan-500 mt-6 rounded-full shadow-[0_0_20px_#22d3ee]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <GoalCard
            active={visibleEvents[0]}
            id="001"
            title="Hackathon 2025"
            desc="Join us for 24 hours of coding challenges, Capture The Flag (CTF) scenarios, and incredible prizes."
            path="#hackathon"
            prefix="EVT"
          />
          <GoalCard
            active={visibleEvents[1]}
            id="002"
            title="Cyber Workshop"
            desc="Hands-on sessions on ethical hacking, penetration testing, and network defense strategies."
            path="#workshop"
            prefix="EVT"
          />
        </div>
      </section>

    </div>
  );
};
export default AboutPage;