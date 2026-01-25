import React, { useEffect, useState, useRef } from "react";

/* ---------- NEURAL NETWORK BACKGROUND (Unchanged) ---------- */
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let frame;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#22d3ee";
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]; p1.update(); p1.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.5 * (1 - dist / 200)})`;
            ctx.lineWidth = 1; ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener("resize", resize);
    resize(); animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

/* ---------- EVENT CARD (UPDATED FOR MONGODB) ---------- */
const EventCard = ({ event }) => (
  <div className="relative bg-[#0a1628]/80 backdrop-blur border border-white/10 rounded-3xl p-8 transition hover:border-cyan-500/40">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-mono tracking-widest text-cyan-400">
        {/* Using slice to show a clean short-ID from MongoDB _id */}
        EVT_{event._id ? event._id.slice(-6).toUpperCase() : "TEMP"}
      </span>
      <span
        className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${
          event.status === "Published"
            ? "bg-cyan-500/20 text-cyan-400"
            : "bg-gray-500/20 text-gray-400"
        }`}
      >
        {event.status}
      </span>
    </div>

    <h3 className="text-2xl font-black text-white mb-3">
      {event.title}
    </h3>

    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {event.description}
    </p>

    <div className="flex justify-between text-xs text-gray-400 font-mono">
      {/* Formatting the Date for a cleaner UI */}
      <span>{new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      <span>{event.time || "TBD"}</span>
    </div>
  </div>
);

/* ---------- EVENTS PAGE (UPDATED WITH FETCH) ---------- */
export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH LIVE EVENTS ON LOAD
  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        // Fetching from the same endpoint you linked in server.js
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        
        // Backend 'getEvents' already filters for 'Published' only for non-admins
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error("Critical: Failed to retrieve portal events", err);
        setLoading(false);
      }
    };
    fetchPublicEvents();
  }, []);

  return (
    <div className="bg-[#010714] min-h-screen text-white relative overflow-x-hidden">
      <NeuralNetwork />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-44 pb-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
          CSC <span className="text-cyan-400">Events</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mt-6 italic">
          Official cybersecurity events, workshops, and competitions
          organized by CSC NITJ.
        </p>
      </section>

      {/* EVENTS GRID */}
      <section className="relative z-10 px-6 pb-32 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
             <p className="text-cyan-400 font-mono animate-pulse uppercase tracking-[0.3em]">
               Accessing Database...
             </p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-gray-500 italic">
            No live events scheduled at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}