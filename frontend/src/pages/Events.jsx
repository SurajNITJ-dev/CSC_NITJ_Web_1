import React, { useEffect, useState, useRef } from "react";

/* ---------- Neural Background (same pattern) ---------- */
const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
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
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.5 * (1 - dist / 200)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/* ---------- Event Card ---------- */
const EventCard = ({ event }) => (
  <div className="relative bg-[#0a1628]/80 backdrop-blur border border-white/10 rounded-3xl p-8 transition hover:border-cyan-500/40">
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-mono tracking-widest text-cyan-400">
        EVT_{event.id}
      </span>
      <span
        className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${
          event.status === "upcoming"
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
      <span>{event.date}</span>
      <span>{event.time}</span>
    </div>
  </div>
);

/* ---------- EVENTS PAGE ---------- */
export default function Events() {
  const [events] = useState([
    {
      id: "001",
      title: "Hackathon 2025",
      description:
        "24-hour Capture The Flag and competitive coding event.",
      date: "12 March 2025",
      time: "6:00 PM",
      status: "upcoming",
    },
    {
      id: "002",
      title: "Cyber Awareness Workshop",
      description:
        "Hands-on workshop covering digital hygiene and security basics.",
      date: "5 February 2025",
      time: "4:00 PM",
      status: "completed",
    },
  ]);

  return (
    <div className="bg-[#010714] min-h-screen text-white relative overflow-x-hidden">
      <NeuralNetwork />

      {/* HERO */}
      <section className="relative z-10 pt-44 pb-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
          CSC <span className="text-cyan-400">Events</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mt-6 italic">
          Official cybersecurity events, workshops and competitions
          organized by CSC NITJ.
        </p>
      </section>

      {/* EVENTS GRID */}
      <section className="relative z-10 px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
