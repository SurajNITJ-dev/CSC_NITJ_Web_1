import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeuralNetwork from "../components/NeuralNetwork";

/* ---------- REGISTRATION FORM MODAL ---------- */
const RegistrationFormModal = ({ event, onClose, onSubmit, loading }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    branch: "",
    year: "",
    rollNumber: ""
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, branch, year, rollNumber } = formData;
    if (!name || !email || !phone || !branch || !year || !rollNumber) {
      setFormError("All fields are required");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setFormError("Enter a valid 10-digit phone number");
      return;
    }
    onSubmit(event._id, formData);
  };

  const inputClass = "w-full bg-[#020617]/85 border border-white/5 hover:border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,209,255,0.1)] rounded-xl py-3 pl-4 pr-4 text-white text-xs font-mono transition-all duration-300 outline-none placeholder:text-slate-600";
  const labelClass = "text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 block";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[480px] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-cyan-500/30 rounded-2xl opacity-50 blur-[3px]" />

        <form
          onSubmit={handleSubmit}
          className="relative bg-[#050b14]/95 backdrop-blur-3xl border border-cyan-500/20 pt-8 pb-8 px-8 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* HUD Brackets */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl pointer-events-none" />

          {/* Top glow line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg border border-transparent hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            ✕
          </button>

          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-black italic uppercase tracking-wider text-white">
              Event <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,209,255,0.3)]">Registration</span>
            </h2>
            <p className="text-slate-500 text-[9px] font-bold tracking-[0.4em] uppercase mt-1.5">
              // {event.title}
            </p>
          </div>

          {/* Event Info Bar */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-cyan-500/[0.04] border border-cyan-500/10 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{event.title}</p>
              <p className="text-[10px] text-slate-500 font-mono">
                {new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • {event.time || "TBD"} • {event.locationMode || "Online"}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@nitj.ac.in" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Roll Number</label>
                <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="e.g. 22103045" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Branch</label>
                <select name="branch" value={formData.branch} onChange={handleChange} className={inputClass + " cursor-pointer"} required>
                  <option value="" className="bg-[#0a1628]">Select Branch</option>
                  <option value="CSE" className="bg-[#0a1628]">CSE</option>
                  <option value="IT" className="bg-[#0a1628]">IT</option>
                  <option value="ECE" className="bg-[#0a1628]">ECE</option>
                  <option value="EE" className="bg-[#0a1628]">EE</option>
                  <option value="ME" className="bg-[#0a1628]">ME</option>
                  <option value="CE" className="bg-[#0a1628]">CE</option>
                  <option value="ICE" className="bg-[#0a1628]">ICE</option>
                  <option value="IPE" className="bg-[#0a1628]">IPE</option>
                  <option value="TT" className="bg-[#0a1628]">TT</option>
                  <option value="BT" className="bg-[#0a1628]">BT</option>
                  <option value="CHE" className="bg-[#0a1628]">CHE</option>
                  <option value="Other" className="bg-[#0a1628]">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <select name="year" value={formData.year} onChange={handleChange} className={inputClass + " cursor-pointer"} required>
                  <option value="" className="bg-[#0a1628]">Select Year</option>
                  <option value="1st Year" className="bg-[#0a1628]">1st Year</option>
                  <option value="2nd Year" className="bg-[#0a1628]">2nd Year</option>
                  <option value="3rd Year" className="bg-[#0a1628]">3rd Year</option>
                  <option value="4th Year" className="bg-[#0a1628]">4th Year</option>
                  <option value="M.Tech" className="bg-[#0a1628]">M.Tech</option>
                  <option value="PhD" className="bg-[#0a1628]">PhD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {formError && (
            <div className="text-red-400 text-[10px] font-bold tracking-widest uppercase bg-red-500/5 border border-red-500/20 p-3 rounded-xl mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{formError}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 text-[#020617] font-black py-3.5 rounded-xl text-xs tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,209,255,0.2)] hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#020617] border-t-transparent rounded-full animate-spin" />
                <span>PROCESSING...</span>
              </>
            ) : (
              <span>CONFIRM REGISTRATION</span>
            )}
          </button>

          {/* Footer */}
          <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/5 text-[8px] font-mono text-slate-600">
            <span>REG_FORM // V1.0</span>
            <span>SECURE_SUBMIT</span>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ---------- EVENT DETAILS MODAL ---------- */
const EventDetailsModal = ({ event, onClose }) => {
  const isPast = new Date(event.date) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[640px] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-cyan-500/30 rounded-2xl opacity-60 blur-[3px]" />

        <div className="relative bg-[#050b14]/95 border border-cyan-500/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto flex flex-col">
          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg border border-transparent hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            ✕
          </button>

          {/* Event Images / Hero banner */}
          {event.images && event.images.length > 0 ? (
            <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl flex-shrink-0">
              <img
                src={event.images[0]}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-black/40" />
              
              {/* Category tag inside banner */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan-500 text-black rounded-md border border-cyan-400">
                  {event.category || "General"}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 backdrop-blur border border-white/10 text-cyan-400 rounded-md">
                  {event.locationMode || "Online"}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-6 flex-shrink-0" />
          )}

          {/* Modal Content container */}
          <div className="pt-6 pb-8 px-8 flex-grow">
            
            {/* Header info */}
            <div className="mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
                {event.title}
              </h2>
              <p className="text-[10px] text-slate-500 font-mono">
                {new Date(event.date).toLocaleDateString("en-IN", { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} • {event.time || "TBD"}
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 p-4 bg-[#0a1628]/45 border border-white/5 rounded-xl text-xs font-mono">
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Duration</span>
                <span className="text-cyan-400 font-bold">{event.duration || "N/A"}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Format</span>
                <span className="text-white">{event.locationMode || "Online"}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Status</span>
                <span className={`font-bold ${isPast ? 'text-slate-500' : 'text-emerald-400'}`}>
                  {isPast ? "Archived // Past Event" : "Active // Upcoming"}
                </span>
              </div>
            </div>

            {/* Content segments */}
            <div className="space-y-6">
              {/* What the event was */}
              <div>
                <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  // 01 / WHAT WAS THE EVENT
                </h4>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                  {event.description}
                </p>
              </div>

              {/* How to participate */}
              {event.howToParticipate && (
                <div>
                  <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    // 02 / HOW TO PARTICIPATE
                  </h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                    {event.howToParticipate}
                  </p>
                </div>
              )}

              {/* Guests/Speakers list */}
              {event.guests && event.guests.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2.5 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    // 03 / SPECIAL GUESTS & SPEAKERS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.guests.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] text-slate-300 font-mono flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-500/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Winner team spotlight (if present) */}
              {event.winners && event.winners !== "N/A (Learning Workshop)" && (
                <div className="relative overflow-hidden p-4 bg-amber-500/[0.04] border border-amber-500/20 rounded-xl">
                  {/* Cyber glow background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl pointer-events-none" />
                  
                  <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    // WINNER TEAM SPOTLIGHT
                  </h4>
                  <p className="text-white text-xs md:text-sm font-bold font-mono tracking-wide leading-relaxed">
                    {event.winners}
                  </p>
                </div>
              )}

              {/* Event Gallery */}
              {event.images && event.images.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    // 04 / EVENT GALLERY & PICS
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {event.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video overflow-hidden rounded-xl border border-white/5 group/gallery cursor-zoom-in">
                        <img
                          src={img}
                          alt={`Event media ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-110"
                        />
                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5 text-[8px] font-mono text-slate-600">
              <span>MODULE // CSC_EVENT_SECURE_VIEW</span>
              <span>NITJ // PORTAL</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
/* ---------- NEURAL NETWORK BACKGROUND ---------- */


/* ---------- REFERENCE FALLBACK EVENTS ---------- */
const fallbackEvents = [
  {
    _id: "evt001",
    title: "Introduction to Capture The Flag (CTF)",
    date: "2026-07-25T10:00:00Z",
    locationMode: "Hybrid",
    category: "Workshop",
    description: "A beginner-friendly workshop explaining jeopardy-style CTF formats, basic toolsets, and navigation.",
    time: "10:00 AM",
    status: "Published"
  },
  {
    _id: "evt002",
    title: "Campus Vulnerability Assessment",
    date: "2026-07-22T10:00:00Z",
    locationMode: "Offline",
    category: "Audit",
    description: "An offline practical threat intelligence and scanning simulation exercise inside NITJ labs.",
    time: "11:00 AM",
    status: "Published"
  },
  {
    _id: "evt003",
    title: "Global Cyber Defense Hackathon",
    date: "2026-07-10T10:00:00Z",
    locationMode: "Online",
    category: "Competition",
    description: "Represent CSC NITJ in securing standard container architectures against simulated payloads.",
    time: "09:00 AM",
    status: "Published"
  }
];

/* ---------- EVENT CARD ---------- */
const EventCard = ({ event, onRegisterToggle, onOpenRegForm, onOpenDetails, registrationLoading }) => {
  const getModeStyles = (mode) => {
    switch (mode?.toLowerCase()) {
      case "offline":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "hybrid":
        return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
      case "online":
      default:
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }
  };

  const getCleanDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  const isPast = eventDate < today;

  const isFull = event.maxParticipants > 0 && event.participantCount >= event.maxParticipants;
  const isRegistered = event.isRegistered;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative cursor-pointer"
      onClick={() => onOpenDetails(event)}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/20 to-transparent rounded-3xl opacity-30 group-hover:opacity-100 transition-all duration-500 blur-[2px]" />

      <div className="relative bg-[#0a1628]/60 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/20 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-4px]">
        <div className="flex justify-between items-center mb-5">
          <span className="text-[9px] font-mono text-cyan-500/40 tracking-[0.25em]">
            EVT_{event._id ? event._id.slice(-6).toUpperCase() : "TEMP"}
          </span>

          <div className="flex items-center gap-1.5">
            <span className={`text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${getModeStyles(event.locationMode || "Online")}`}>
              {event.locationMode || "Online"}
            </span>

            <span className="text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              {event.category || "General"}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-black text-white mb-3 tracking-tight leading-tight group-hover:text-cyan-400 transition-colors duration-300">
          {event.title}
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
          {event.description}
        </p>

        {/* Seat / Participant availability stats */}
        {!isPast && (
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-5">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{event.participantCount || 0} Registered</span>
            </span>
            {event.maxParticipants > 0 && (
              <span>
                {Math.max(0, event.maxParticipants - (event.participantCount || 0))} / {event.maxParticipants} Seats Left
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-5 border-t border-white/5">
          <div className="flex flex-col text-slate-500 font-mono text-[9px]">
            <span className="text-slate-400 font-bold">{getCleanDate(event.date)}</span>
            <span className="mt-0.5">{event.time || "TBD"}</span>
          </div>

          {isPast ? (
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white/5 border border-white/5 px-4 py-2 rounded-full cursor-not-allowed">
              Event Ended
            </span>
          ) : isRegistered ? (
            <button
              onClick={(e) => { e.stopPropagation(); onRegisterToggle(event._id); }}
              disabled={registrationLoading}
              className="group/regBtn px-4 py-2 bg-emerald-500/10 hover:bg-red-500/15 text-emerald-400 hover:text-red-400 border border-emerald-500/25 hover:border-red-500/30 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              {registrationLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="group-hover/regBtn:hidden">Registered ✓</span>
                  <span className="hidden group-hover/regBtn:inline">Cancel Reg</span>
                </>
              )}
            </button>
          ) : isFull ? (
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/20 border border-slate-700/20 px-4 py-2 rounded-full cursor-not-allowed">
              Full
            </span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenRegForm(event); }}
              disabled={registrationLoading}
              className="px-4 py-2 bg-cyan-500 text-black border border-cyan-400 hover:bg-transparent hover:text-cyan-400 hover:border-cyan-500/35 hover:shadow-[0_0_15px_rgba(0,209,255,0.2)] text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              {registrationLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- DYNAMIC CYBER TIMELINE GRAPH ---------- */
const CyberTimelineGraph = ({ events, onOpenDetails }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-[#0a1628]/40 border border-white/5 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">Event Timeline</h3>
      </div>

      <div className="relative pl-6 border-l border-dashed border-cyan-500/20 space-y-6 py-1">
        {/* Glowing animated runner dot on the timeline line */}
        <div className="absolute left-[-3.5px] top-0 w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-bounce" style={{ animationDuration: "3s" }} />

        {sortedEvents.map((evt) => {
          const evtDate = new Date(evt.date);
          const isPast = evtDate < today;
          
          let colorClass = "bg-emerald-500 shadow-[0_0_8px_#10b981]";
          let borderClass = "border-emerald-500/25";
          let textGlow = "group-hover:text-emerald-400";
          
          if (evt.category?.toLowerCase() === "workshop") {
            colorClass = "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
            borderClass = "border-cyan-400/25";
            textGlow = "group-hover:text-cyan-400";
          } else if (evt.category?.toLowerCase() === "competition") {
            colorClass = "bg-amber-400 shadow-[0_0_8px_#f59e0b]";
            borderClass = "border-amber-400/25";
            textGlow = "group-hover:text-amber-400";
          } else if (evt.category?.toLowerCase() === "audit") {
            colorClass = "bg-red-400 shadow-[0_0_8px_#f87171]";
            borderClass = "border-red-400/25";
            textGlow = "group-hover:text-red-400";
          }

          if (isPast) {
            colorClass = "bg-slate-600 shadow-none";
            borderClass = "border-slate-800";
            textGlow = "group-hover:text-slate-300";
          }

          return (
            <div 
              key={evt._id}
              onClick={() => onOpenDetails(evt)}
              className="group relative flex items-start gap-4 cursor-pointer"
            >
              {/* Timeline node */}
              <div className="absolute left-[-30px] top-1.5 flex items-center justify-center">
                <span className={`w-2.5 h-2.5 rounded-full ${colorClass} transition-transform duration-300 group-hover:scale-125`} />
              </div>

              {/* Event details tag */}
              <div className={`flex-grow p-3 bg-[#0a1628]/25 group-hover:bg-[#0a1628]/85 border ${borderClass} rounded-xl transition-all duration-300 group-hover:-translate-y-0.5`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    {evtDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </span>
                  <span className="text-[7px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                    {evt.category || "General"}
                  </span>
                </div>
                <h4 className={`text-[11px] font-bold text-slate-300 truncate transition-colors duration-300 ${textGlow}`}>
                  {evt.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- DYNAMIC CYBER CALENDAR (THEME MATCHED) ---------- */
const CyberCalendar = ({ events, selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = () => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarCells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      calendarCells.push({ dayNum: "", fullDateStr: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedMonth = String(month + 1).padStart(2, "0");
      const formattedDay = String(day).padStart(2, "0");
      const fullDateStr = `${year}-${formattedMonth}-${formattedDay}`;
      calendarCells.push({ dayNum: day, fullDateStr });
    }

    return calendarCells;
  };

  const cells = getDaysInMonth();

  const getCellEvents = (cellDateStr) => {
    if (!cellDateStr) return [];
    return events.filter(evt => evt.date.startsWith(cellDateStr));
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Filter events scheduled on or after today
  const upcomingEvents = events.filter(evt => {
    try {
      const evtDate = new Date(evt.date);
      return evtDate >= todayStart;
    } catch {
      return false;
    }
  });

  const selectedDayEvents = selectedDate ? getCellEvents(selectedDate) : [];
  const displayEvents = selectedDate ? selectedDayEvents : upcomingEvents;
  const bannerHeaderLabel = selectedDate ? "Events Selected" : "Upcoming Events";

  const getCategoryStyle = (category) => {
    switch (category?.toLowerCase()) {
      case "workshop": return "text-violet-400 bg-violet-500/10 border-violet-500/25";
      case "competition": return "text-rose-400 bg-rose-500/10 border-rose-500/25";
      case "audit": return "text-amber-400 bg-amber-500/10 border-amber-500/25";
      default: return "text-cyan-400 bg-cyan-500/10 border-cyan-500/25";
    }
  };

  return (
    <div className="relative w-full">
      {/* Outer glow border */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/20 to-transparent rounded-2xl opacity-40 blur-[2px]" />
      
      {/* Main Card */}
      <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        
        {/* Top glow line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Calendar Header */}
        <div className="px-5 pt-5 pb-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white font-mono tracking-wide">
              {monthNames[month]} <span className="text-cyan-400">{year}</span>
            </span>
          </div>

          <div className="flex gap-1.5">
            <button 
              onClick={prevMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-cyan-500/5 border border-cyan-500/15 text-[11px] text-cyan-400/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
            >
              &lt;
            </button>
            <button 
              onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-cyan-500/5 border border-cyan-500/15 text-[11px] text-cyan-400/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Days of Week Row */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="text-[9px] font-bold text-cyan-500/40 uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Cells Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {cells.map((cell, idx) => {
              const cellEvents = getCellEvents(cell.fullDateStr);
              const hasEvent = cellEvents.length > 0;
              const isSelected = selectedDate === cell.fullDateStr;

              const today = new Date();
              const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const cellDate = cell.dayNum ? new Date(year, month, cell.dayNum) : null;
              
              const isToday = cellDate && 
                              cellDate.getDate() === today.getDate() && 
                              cellDate.getMonth() === today.getMonth() && 
                              cellDate.getFullYear() === today.getFullYear();
              
              const isPast = cellDate && cellDate < todayStart;

              return (
                <div key={idx} className="relative aspect-square flex flex-col items-center justify-center">
                  {cell.dayNum ? (
                    <button
                      onClick={() => onSelectDate(isSelected ? null : cell.fullDateStr)}
                      className="relative w-8 h-8 flex flex-col items-center justify-center transition-all duration-300 rounded-full cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`absolute inset-0 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                          isToday
                            ? "bg-cyan-400 text-[#020617] font-black shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                            : isSelected
                            ? "border-2 border-cyan-400 text-cyan-400 font-bold bg-cyan-500/10 shadow-[0_0_10px_rgba(0,209,255,0.2)]"
                            : hasEvent
                            ? "text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_8px_rgba(0,209,255,0.15)]"
                            : isPast
                            ? "text-slate-600 cursor-not-allowed"
                            : "text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        {cell.dayNum}
                      </div>

                      {/* Cyan dot for event days, dim for past */}
                      {hasEvent && !isToday && (
                        <span className={`absolute bottom-0 w-1 h-1 rounded-full ${isPast ? 'bg-slate-600' : 'bg-cyan-400 shadow-[0_0_4px_rgba(0,209,255,0.5)]'}`} />
                      )}
                    </button>
                  ) : (
                    <span className="w-8 h-8" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events Panel */}
        {selectedDate && (
          <div className="mx-4 mb-4 bg-cyan-500/[0.04] border border-cyan-500/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,209,255,0.5)]" />
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <button onClick={() => onSelectDate(null)} className="text-[9px] text-slate-500 hover:text-cyan-400 font-mono uppercase tracking-wider transition-colors cursor-pointer">✕ clear</button>
            </div>

            <div className="flex flex-col gap-2">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((evt, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <span className={`font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border text-[8px] flex-shrink-0 ${getCategoryStyle(evt.category)}`}>
                      {evt.category || "EVT"}
                    </span>
                    <span className="text-slate-300 font-semibold truncate">{evt.title}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="text-[10px] text-slate-500 font-mono">No events on selected date</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-white/5 flex justify-between items-center">
          <span className="text-[8px] font-mono text-cyan-500/25 tracking-[0.2em]">CAL_MODULE //</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-cyan-500/20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- UPCOMING EVENTS STATUS DASHBOARD ---------- */
const UpcomingEventsStatus = ({ events }) => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Get upcoming events (today or future)
  const upcomingEvents = events
    .filter(evt => {
      try {
        return new Date(evt.date) >= todayStart;
      } catch { return false; }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getDaysLeft = (dateStr) => {
    try {
      const evtDate = new Date(dateStr);
      const diff = Math.ceil((evtDate - todayStart) / (1000 * 60 * 60 * 24));
      if (diff === 0) return "Today";
      if (diff === 1) return "Tomorrow";
      return `${diff} days`;
    } catch { return "—"; }
  };

  const getStatusColor = (dateStr) => {
    try {
      const diff = Math.ceil((new Date(dateStr) - todayStart) / (1000 * 60 * 60 * 24));
      if (diff <= 0) return { dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]", text: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", label: "LIVE" };
      if (diff <= 3) return { dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", label: "SOON" };
      return { dot: "bg-cyan-400 shadow-[0_0_8px_rgba(0,209,255,0.6)]", text: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", label: "UPCOMING" };
    } catch {
      return { dot: "bg-slate-400", text: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20", label: "—" };
    }
  };

  const getCategoryStyle = (category) => {
    switch (category?.toLowerCase()) {
      case "workshop": return "text-violet-400 bg-violet-500/10 border-violet-500/25";
      case "competition": return "text-rose-400 bg-rose-500/10 border-rose-500/25";
      case "audit": return "text-amber-400 bg-amber-500/10 border-amber-500/25";
      default: return "text-cyan-400 bg-cyan-500/10 border-cyan-500/25";
    }
  };

  const getCleanDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    } catch { return "—"; }
  };

  const displayEvents = upcomingEvents.slice(0, 4);

  return (
    <div className="w-full max-w-[520px]">
      <div className="relative bg-[#0a1628]/70 backdrop-blur-xl border border-cyan-500/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        
        {/* Top glow line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Upcoming Events</h3>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">Live Status Feed</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
              {upcomingEvents.length} Active
            </span>
          </div>
        </div>

        {/* Events Timeline List */}
        <div className="px-6 py-4 space-y-1">
          {displayEvents.length > 0 ? displayEvents.map((evt, i) => {
            const status = getStatusColor(evt.date);
            const catStyle = getCategoryStyle(evt.category);
            
            return (
              <div key={i} className="group relative flex items-stretch gap-4 py-3">
                {/* Timeline connector line */}
                <div className="flex flex-col items-center w-4 flex-shrink-0 relative">
                  <div className={`w-2.5 h-2.5 rounded-full ${status.dot} z-10 mt-1.5 transition-all duration-300 group-hover:scale-125`} />
                  {i < displayEvents.length - 1 && (
                    <div className="w-[1px] flex-1 bg-gradient-to-b from-white/10 to-transparent mt-1" />
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${catStyle}`}>
                      {evt.category || "Event"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors duration-300">
                    {evt.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {getCleanDate(evt.date)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {evt.time || "TBD"}
                    </span>
                  </div>
                </div>

                {/* Countdown badge */}
                <div className="flex-shrink-0 flex flex-col items-end justify-center">
                  <span className={`text-xs font-black ${status.text} font-mono`}>
                    {getDaysLeft(evt.date)}
                  </span>
                  <span className="text-[8px] text-slate-600 font-mono uppercase tracking-wider">left</span>
                </div>
              </div>
            );
          }) : (
            <div className="py-8 text-center">
              <span className="text-sm text-slate-600 font-mono">// NO_UPCOMING_EVENTS</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/5 flex justify-between items-center">
          <span className="text-[9px] font-mono text-cyan-500/30 tracking-[0.2em]">SYS_STATUS // ACTIVE</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-cyan-500/20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- EVENTS PAGE ---------- */
export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Registration loading states, toast feedback & modal
  const [registrationLoadingId, setRegistrationLoadingId] = useState(null);
  const [regFormEvent, setRegFormEvent] = useState(null);
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [toast, setToast] = useState(null);

  const filters = ["All", "Workshop", "Audit", "Competition"];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPublicEvents = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const url = `${apiBase}/api/events`;
      
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Server response error");
      const data = await res.json();
      
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(fallbackEvents);
      }
    } catch (err) {
      console.warn("Failed to fetch database events, running fallback list.", err);
      setEvents(fallbackEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicEvents();
  }, []);

  // Open registration form modal (for new registrations)
  const handleOpenRegForm = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Access Denied: Please Login to register", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    setRegFormEvent(event);
  };

  // Submit registration with form data
  const handleRegFormSubmit = async (eventId, formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Access Denied: Please Login to register", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    setRegistrationLoadingId(eventId);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const url = `${apiBase}/api/events/${eventId}/register`;
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setEvents(prev => prev.map(evt => {
        if (evt._id === eventId) {
          return {
            ...evt,
            isRegistered: data.isRegistered,
            participantCount: data.participantCount
          };
        }
        return evt;
      }));

      setRegFormEvent(null); // Close modal
      showToast(data.message || "Registered Successfully!", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setRegistrationLoadingId(null);
    }
  };

  // Unregister (cancel registration)
  const handleUnregister = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Access Denied: Please Login", "error");
      return;
    }

    setRegistrationLoadingId(eventId);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const url = `${apiBase}/api/events/${eventId}/register`;
      
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");

      setEvents(prev => prev.map(evt => {
        if (evt._id === eventId) {
          return {
            ...evt,
            isRegistered: data.isRegistered,
            participantCount: data.participantCount
          };
        }
        return evt;
      }));

      showToast(data.message || "Registration Cancelled", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setRegistrationLoadingId(null);
    }
  };

  const filteredEvents = events.filter((evt) => {
    const categoryMatches = activeFilter === "All" || evt.category?.toLowerCase() === activeFilter.toLowerCase();
    const dateMatches = !selectedDate || evt.date.startsWith(selectedDate);
    return categoryMatches && dateMatches;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingFilteredEvents = filteredEvents.filter(evt => {
    try {
      const evtDate = new Date(evt.date);
      evtDate.setHours(0, 0, 0, 0);
      return evtDate >= today;
    } catch {
      return true;
    }
  });

  const pastFilteredEvents = filteredEvents.filter(evt => {
    try {
      const evtDate = new Date(evt.date);
      evtDate.setHours(0, 0, 0, 0);
      return evtDate < today;
    } catch {
      return false;
    }
  });

  return (
    <div className="bg-[#020617] min-h-screen text-white relative overflow-x-hidden pt-36 pb-32">
      {/* Cyber Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-[100] max-w-sm w-full"
          >
            <div className={`relative backdrop-blur-xl border p-4 rounded-xl shadow-2xl flex items-start gap-3 ${
              toast.type === "error" 
                ? "bg-red-950/40 border-red-500/30 text-red-200" 
                : "bg-cyan-950/40 border-cyan-500/30 text-cyan-200"
            }`}>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-45" />
              
              <div className="mt-0.5 flex-shrink-0">
                {toast.type === "error" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-40 block mb-0.5">
                  System Notification //
                </span>
                <p className="text-xs font-semibold leading-relaxed">
                  {toast.message}
                </p>
              </div>

              <button onClick={() => setToast(null)} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NeuralNetwork />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

       {/* HEADER SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          {/* Left Title & Text */}
          <div className="lg:col-span-2 text-center lg:text-left flex flex-col justify-center pt-2">
            <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-[0.3em] mb-3 inline-block">
              Calendar / Activity //
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Club <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,209,255,0.3)]">Events.</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
              Stay updated with workshops, CTFs, talks, and competitions happening at CSC NITJ.
            </p>
          </div>

          {/* Right: Upcoming Events Status Dashboard */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <UpcomingEventsStatus events={events} />
          </div>

        </div>
      </section>

      {/* FILTER BUTTONS PILLS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-8 flex flex-wrap gap-3 justify-center md:justify-start">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setSelectedDate(null);
            }}
            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 cursor-pointer ${
              activeFilter === filter
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[inset_0_0_10px_rgba(0,209,255,0.15)]"
                : "bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* EVENTS GRID + CALENDAR SIDEBAR */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
          
          {/* Left: Event Cards */}
          <div>
            {loading ? (
              <div className="text-center py-20">
                 <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                 <p className="text-cyan-500/70 font-mono text-[10px] uppercase tracking-[0.3em]">
                   Accessing Secure Database...
                 </p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-24 bg-[#0a1628]/30 border border-white/5 rounded-3xl p-10 shadow-inner">
                <span className="text-2xl text-slate-600 block mb-2 font-mono">// NO_RECORDS_FOUND</span>
                <p className="text-xs text-slate-500">
                  No live events scheduled under this filter category or selected date at the moment. Check back soon!
                </p>
              </div>
            ) : (
               <div className="space-y-12">
                 {/* Active & Upcoming Events */}
                 <div>
                   <div className="flex items-center gap-3 mb-6">
                     <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                     <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Active & Upcoming Events</h2>
                     <span className="text-[10px] font-mono text-cyan-500/40">({upcomingFilteredEvents.length})</span>
                   </div>

                   {upcomingFilteredEvents.length === 0 ? (
                     <div className="py-12 text-center bg-[#0a1628]/20 border border-white/5 rounded-2xl border-dashed">
                       <p className="text-xs text-slate-500 font-mono">// NO_UPCOMING_EVENTS_FOUND</p>
                     </div>
                   ) : (
                     <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <AnimatePresence mode="popLayout">
                         {upcomingFilteredEvents.map((event) => (
                           <EventCard 
                             key={event._id} 
                             event={event} 
                             onRegisterToggle={handleUnregister}
                             onOpenRegForm={handleOpenRegForm}
                             onOpenDetails={setDetailsEvent}
                             registrationLoading={registrationLoadingId === event._id}
                           />
                         ))}
                       </AnimatePresence>
                     </motion.div>
                   )}
                 </div>

                 {/* Past Events Archive */}
                 {pastFilteredEvents.length > 0 && (
                   <div className="border-t border-white/5 pt-10">
                     <div className="flex items-center gap-3 mb-6">
                       <span className="w-2 h-2 rounded-full bg-slate-600" />
                       <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">Past Events Archive</h2>
                       <span className="text-[10px] font-mono text-slate-500 font-bold">({pastFilteredEvents.length})</span>
                     </div>

                     <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-75 hover:opacity-100 transition-opacity duration-300">
                       <AnimatePresence mode="popLayout">
                         {pastFilteredEvents.map((event) => (
                           <EventCard 
                             key={event._id} 
                             event={event} 
                             onRegisterToggle={handleUnregister}
                             onOpenRegForm={handleOpenRegForm}
                             onOpenDetails={setDetailsEvent}
                             registrationLoading={registrationLoadingId === event._id}
                           />
                         ))}
                       </AnimatePresence>
                     </motion.div>
                   </div>
                 )}
               </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <CyberCalendar
                events={events}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              <CyberTimelineGraph
                events={events}
                onOpenDetails={setDetailsEvent}
              />
            </div>
          </div>

        </div>

        {/* Mobile Calendar & Timeline — shown below events on small screens */}
        <div className="lg:hidden mt-10 max-w-[340px] mx-auto space-y-6">
          <CyberCalendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <CyberTimelineGraph
            events={events}
            onOpenDetails={setDetailsEvent}
          />
        </div>
      </section>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {regFormEvent && (
          <RegistrationFormModal
            event={regFormEvent}
            onClose={() => setRegFormEvent(null)}
            onSubmit={handleRegFormSubmit}
            loading={registrationLoadingId === regFormEvent._id}
          />
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {detailsEvent && (
          <EventDetailsModal
            event={detailsEvent}
            onClose={() => setDetailsEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}