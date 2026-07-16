import React, { useState } from "react";

export default function HowItWorks() {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <section className="relative min-h-screen bg-[#01010a] text-cyan-300 overflow-hidden">
      {/* Left side vertical text list */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-8">
        <div className="flex items-center space-x-2 group">
          <span className="text-sm opacity-70">/01</span>
          <h3 className="text-2xl font-medium text-cyan-400 group-hover:scale-105 transition-transform">
            Web based
          </h3>
        </div>
        <div className="flex items-center space-x-2 group">
          <span className="text-sm opacity-70">/02</span>
          <h3 className="text-2xl font-medium text-cyan-400 group-hover:scale-105 transition-transform">
            Collaborative
          </h3>
        </div>
        <div className="flex items-center space-x-2 group">
          <span className="text-sm opacity-70">/03</span>
          <h3 className="text-2xl font-medium text-cyan-400 group-hover:scale-105 transition-transform">
            Real-time
          </h3>
        </div>
      </div>

      {/* Central glowing avatar with particle effect */}
      <div className="absolute inset-0 flex items-start justify-center pt-12 pointer-events-none">
        <div className="relative w-48 h-48">
          {/* Avatar circle */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/30 animate-pulse" />
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200"
            alt="User Avatar"
            className="relative w-full h-full rounded-full object-cover border-4 border-cyan-500/70 shadow-[0_0_30px_#00d1ff]"
          />
          {/* Particle / ripple effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute left-1/2 top-0 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-particle" style={{ animationDelay: "0s" }} />
            <span className="absolute left-1/2 top-0 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-particle" style={{ animationDelay: "0.5s" }} />
            <span className="absolute left-1/2 top-0 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-particle" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>

      {/* Right side vertical slider */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
        {/* Up chevron */}
        <button className="text-cyan-400 hover:text-cyan-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {/* Slider track */}
        <div className="relative h-64 w-1 bg-cyan-800/50 rounded-full">
          {/* Tick marks */}
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="absolute left-0 -translate-x-1/2 w-2 h-0.5 bg-cyan-500"
              style={{ top: `${(i / 4) * 100}%` }}
            />
          ))}
          {/* Draggable bead */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-64 opacity-0 cursor-pointer"
            style={{ writingMode: "bt-lr" }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00d1ff]"
            style={{ top: `${sliderValue}%` }}
          />
        </div>
        {/* Down chevron */}
        <button className="text-cyan-400 hover:text-cyan-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Bottom left cyan circular button with text */}
      <div className="absolute left-8 bottom-12 flex items-center space-x-3">
        <button className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 shadow-[0_0_20px_#00d1ff] hover:shadow-[0_0_30px_#00d1ff] transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#01010a] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-cyan-300 drop-shadow-[0_0_5px_#00d1ff]">
          HOW IT WORKS?
        </h2>
      </div>
    </section>
  );
}

/* CSS Animations (Tailwind @layer) */
/* Add this to your global CSS (e.g., src/index.css) */
/*
@layer utilities {
  @keyframes particle {
    0% { transform: translate(-50%, -10%) scale(0.5); opacity: 0.7; }
    100% { transform: translate(-50%, -150%) scale(1.5); opacity: 0; }
  }
  .animate-particle { animation: particle 2s infinite linear; }
}
*/
