import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import NeuralNetwork from '../components/NeuralNetwork';

// --- 2. REUSABLE CYBER CARD (Adapted for Profile Content) ---
const CyberCard = ({ active, className, children, delay = 0 }) => {
  return (
    <div 
      className={`group relative transition-all transform ease-in-out ${className} ${
        active 
          ? 'opacity-100 translate-y-0 scale-100 duration-1000' 
          : 'opacity-0 translate-y-12 scale-95 duration-300'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Backdrop */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-500/40 to-transparent rounded-[2.5rem] opacity-30 group-hover:opacity-60 transition-all duration-500 blur-[2px]" />
      
      {/* Main Container */}
      <div className="relative h-full bg-[#0a1628]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] overflow-hidden flex flex-col">
        
        {/* Top Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] transition-all duration-[1500ms] ease-out"
            style={{ width: active ? '100%' : '0%' }}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

// --- 3. MAIN PROFILE PAGE ---
const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events"); // "events" or "blogs"
  
  // Animation State
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          name: data.name,
          email: data.email,
          role: data.role || "User",
          joinedAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          }) : "TBD",
          blogs: data.blogsCount || 0,
          likes: data.likesCount || 0,
          eventsCount: data.eventsCount || 0,
          registeredEvents: data.registeredEvents || [],
          rollNumber: data.rollNumber || "",
          branch: data.branch || "",
          college: data.college || "NIT Jalandhar",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  /* ================= TRIGGER ANIMATIONS ON LOAD ================= */
  useEffect(() => {
    if (!loading && user) {
      setTimeout(() => setHeaderVisible(true), 100);
      setTimeout(() => setCardsVisible(true), 400);
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#010714] flex items-center justify-center text-cyan-400 font-mono">
        <NeuralNetwork />
        <div className="relative z-10 flex flex-col items-center animate-pulse">
            <div className="h-1 w-24 bg-cyan-500 shadow-[0_0_15px_#22d3ee] mb-4"/>
            <span className="tracking-[0.5em] text-xs font-bold uppercase">Initializing Uplink...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background Canvas */}
      <NeuralNetwork />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* HEADER SECTION */}
        <div className={`flex flex-col items-center mb-16 text-center transition-all transform ${
           headerVisible ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-10 duration-500'
        }`}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300">SECURE CONNECTION ESTABLISHED</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white/90">
            Cyber <span className="text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">Identity</span>
          </h1>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* --- LEFT COLUMN: IDENTITY CARD --- */}
          <div className="lg:col-span-4">
            <CyberCard active={cardsVisible} delay={0} className="h-full">
              
               {/* Card Header */}
               <div className="flex justify-between items-center mb-10">
                  <span className="font-mono text-[10px] text-cyan-500/80 tracking-[3px] bg-cyan-500/5 px-3 py-1 rounded-md border border-cyan-500/20">
                    ID_{user.role.toUpperCase().substring(0,3)}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
               </div>

                {/* Avatar Section & Details */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6 group-hover:scale-105 transition-transform duration-500">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-cyan-500/50 animate-[spin_15s_linear_infinite_reverse]" />
                    
                    {/* Center Initials */}
                    <div className="absolute inset-4 rounded-full bg-[#0a1628] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <span className="text-4xl font-black text-cyan-400">{user.name?.[0] || "U"}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white text-center mb-1 tracking-wide">{user.name}</h2>
                  <p className="text-cyan-500/60 font-mono text-xs tracking-wider mb-8">&lt; {user.email} /&gt;</p>

                  {/* Details List */}
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase tracking-widest">Role</span>
                       <span className="text-cyan-400 font-bold text-sm shadow-cyan-glow">{user.role}</span>
                    </div>
                    {user.rollNumber && (
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-gray-400 text-xs uppercase tracking-widest">Roll No</span>
                         <span className="text-white font-mono text-xs">{user.rollNumber}</span>
                      </div>
                    )}
                    {user.branch && (
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-gray-400 text-xs uppercase tracking-widest">Branch</span>
                         <span className="text-white font-mono text-xs">{user.branch}</span>
                      </div>
                    )}
                    {user.college && (
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="text-gray-400 text-xs uppercase tracking-widest">College</span>
                         <span className="text-white font-mono text-xs">{user.college}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase tracking-widest">Joined</span>
                       <span className="text-white font-mono text-xs">{user.joinedAt}</span>
                    </div>
                  </div>
                </div>
             </CyberCard>
          </div>

          {/* --- RIGHT COLUMN: STATS & ACTIONS --- */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* STATS CARD */}
            <CyberCard active={cardsVisible} delay={200} className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-mono text-[10px] text-cyan-500/80 tracking-[3px] bg-cyan-500/5 px-3 py-1 rounded-md border border-cyan-500/20">
                    METRICS_001
                  </span>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-center">
                  
                  {/* Blog Stat */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-colors">
                     <h3 className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">Total Blogs</h3>
                     <div className="flex items-end gap-4">
                       <span className="text-6xl font-black text-white group-hover:text-cyan-400 transition-colors duration-500">
                         {user.blogs < 10 ? `0${user.blogs}` : user.blogs}
                       </span>
                       {/* Visualizer Lines */}
                       <div className="flex gap-1 h-8 items-end opacity-40 mb-2">
                          {[40, 70, 30, 80, 50].map((h, i) => (
                            <div key={i} className="w-1 bg-cyan-500" style={{ height: `${h}%` }} />
                          ))}
                       </div>
                     </div>
                  </div>

                  {/* Likes Stat */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-purple-500/30 transition-colors">
                     <h3 className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">Reputation</h3>
                     <div className="flex items-end gap-4">
                       <span className="text-6xl font-black text-white group-hover:text-purple-400 transition-colors duration-500">
                         {user.likes < 10 ? `0${user.likes}` : user.likes}
                       </span>
                        {/* Visualizer Lines */}
                        <div className="flex gap-1 h-8 items-end opacity-40 mb-2">
                          {[60, 20, 90, 40, 70].map((h, i) => (
                            <div key={i} className="w-1 bg-purple-500" style={{ height: `${h}%` }} />
                          ))}
                       </div>
                     </div>
                  </div>

                  {/* Events Participated Stat */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-colors">
                    <h3 className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">Events</h3>
                    <div className="flex items-end gap-4">
                      <span className="text-6xl font-black text-white group-hover:text-emerald-400 transition-colors duration-500">
                        {user.eventsCount < 10 ? `0${user.eventsCount}` : user.eventsCount}
                      </span>
                      {/* Visualizer Lines */}
                      <div className="flex gap-1 h-8 items-end opacity-40 mb-2">
                         {[30, 50, 80, 40, 90].map((h, i) => (
                           <div key={i} className="w-1 bg-emerald-500" style={{ height: `${h}%` }} />
                         ))}
                      </div>
                    </div>
                  </div>

               </div>
            </CyberCard>

            {/* REGISTERED EVENTS / MY BLOGS LOG */}
            <CyberCard active={cardsVisible} delay={300} className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-cyan-500/80 tracking-[3px] bg-cyan-500/5 px-3 py-1 rounded-md border border-cyan-500/20">
                  {activeTab === "events" ? "EVENTS_LOG" : "BLOGS_LOG"}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab("events")}
                    className={`px-3 py-1 text-[10px] font-mono rounded uppercase transition-all duration-300 cursor-pointer ${
                      activeTab === "events" 
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                        : "text-slate-500 hover:text-slate-300 border border-transparent"
                    }`}
                  >
                    Events
                  </button>
                  <button 
                    onClick={() => setActiveTab("blogs")}
                    className={`px-3 py-1 text-[10px] font-mono rounded uppercase transition-all duration-300 cursor-pointer ${
                      activeTab === "blogs" 
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                        : "text-slate-500 hover:text-slate-300 border border-transparent"
                    }`}
                  >
                    Blogs
                  </button>
                </div>
              </div>

              {activeTab === "events" ? (
                <>
                  <h3 className="text-lg font-bold text-white mb-6 tracking-wide flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Registered Events
                  </h3>

                  {user.registeredEvents && user.registeredEvents.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {user.registeredEvents.map((evt, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex justify-between items-center gap-4"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                evt.category?.toLowerCase() === 'workshop' ? 'text-violet-400 bg-violet-500/10 border-violet-500/25' :
                                evt.category?.toLowerCase() === 'competition' ? 'text-rose-400 bg-rose-500/10 border-rose-500/25' :
                                'text-cyan-400 bg-cyan-500/10 border-cyan-500/25'
                              }`}>
                                {evt.category || 'General'}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {evt.locationMode || 'Online'}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white truncate">{evt.title}</h4>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-mono text-cyan-400 block font-bold">
                              {new Date(evt.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {evt.time || 'TBD'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center bg-white/5 border border-white/5 rounded-2xl border-dashed">
                      <p className="text-slate-500 text-xs font-mono">// NO_PARTICIPATIONS_LOGGED</p>
                      <button 
                        onClick={() => navigate('/events')}
                        className="mt-3 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/30 text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        View Events
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white mb-6 tracking-wide flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    My Written Blogs
                  </h3>

                  {user.userBlogs && user.userBlogs.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {user.userBlogs.map((blog, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all flex justify-between items-center gap-4"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                blog.status === 'approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' :
                                blog.status === 'pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/25' :
                                'text-rose-400 bg-rose-500/10 border-rose-500/25'
                              }`}>
                                {blog.status}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white truncate">{blog.title}</h4>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-mono text-cyan-400 block font-bold">
                              {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center bg-white/5 border border-white/5 rounded-2xl border-dashed">
                      <p className="text-slate-500 text-xs font-mono">// NO_BLOGS_PUBLISHED</p>
                      <button 
                        onClick={() => navigate('/create-blog')}
                        className="mt-3 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/30 text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        Create Blog
                      </button>
                    </div>
                  )}
                </>
              )}
            </CyberCard>

            {/* ACTION BUTTONS ROW */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${
              cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
               
              <button 
     onClick={() => navigate('/edit-profile')}// <--- ADD THIS LINE
      className="relative group overflow-hidden rounded-xl bg-[#0a1628] border border-cyan-500/30 p-4 text-center hover:border-cyan-500 transition-all duration-300"
   >
      <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <span className="relative font-mono text-xs font-bold tracking-[0.2em] text-cyan-400 group-hover:text-white uppercase">
        Edit Profile
      </span>
   </button>

               <button 
                 onClick={() => setActiveTab(activeTab === "blogs" ? "events" : "blogs")}
                 className="relative group overflow-hidden rounded-xl bg-[#0a1628] border border-white/10 p-4 text-center hover:border-white/30 transition-all duration-300"
               >
                  <span className="relative font-mono text-xs font-bold tracking-[0.2em] text-gray-400 group-hover:text-white uppercase">
                    {activeTab === "blogs" ? "My Events" : "My Blogs"}
                  </span>
               </button>

               <button 
                 onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                 className="relative group overflow-hidden rounded-xl bg-[#0a1628] border border-red-500/30 p-4 text-center hover:border-red-500 transition-all duration-300"
               >
                  <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative font-mono text-xs font-bold tracking-[0.2em] text-red-500 group-hover:text-white uppercase">
                   LOGOUT
                  </span>
               </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;