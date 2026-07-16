import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeuralNetwork from "../components/NeuralNetwork";

const fallbackBlogs = [
  {
    _id: "blog001",
    title: "Zero Trust Architecture: The Modern Defense",
    category: "Cybersecurity",
    content: "Zero Trust is a security framework based on the premise that organizations should not automatically trust anything inside or outside its perimeters. Instead, we must verify anything and everything trying to connect to its systems before granting access. In this comprehensive guide, we cover micro-segmentation, identity access management (IAM), and continuous posture validation.",
    author: { name: "CSC Admin" },
    createdAt: "2026-06-12T10:00:00Z",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    likes: [1, 2, 3, 4, 5],
    comments: [1, 2, 3]
  },
  {
    _id: "blog002",
    title: "Symmetric vs Asymmetric Encryption: Cryptography 101",
    category: "Cybersecurity",
    content: "Deep dive into secure key exchanges, public/private key pairs, and modern algorithms. Learn how Diffie-Hellman, RSA, and AES protect data in transit and rest. We explore computational complexity and why quantum computing poses a threat to current asymmetric standards.",
    author: { name: "Aarav Sharma" },
    createdAt: "2026-06-12T11:00:00Z",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    likes: [1, 2, 3],
    comments: [1]
  },
  {
    _id: "blog003",
    title: "Exploiting Buffer Overflows: Stack Frame Hijacking",
    category: "Ethical Hacking",
    content: "A technical walkthrough of stack frame structures, return pointer overwrites, and memory injection. We write a custom shellcode exploit to bypass stack protection mechanisms and execute code remotely on x86 architectures.",
    author: { name: "Suraj Verma" },
    createdAt: "2026-06-12T12:00:00Z",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=800",
    likes: [1, 2, 3, 4, 5, 6, 7],
    comments: [1, 2, 3, 4]
  },
  {
    _id: "blog004",
    title: "Digital Forensics: Chain of Custody & Memory Capture",
    category: "Awareness",
    content: "Learn how forensic investigators capture volatile RAM evidence without tampering with files. We cover the Volatility framework, FTK Imager, and how registry keys hold hidden system artifacts during malware execution.",
    author: { name: "Ananya Sen" },
    createdAt: "2026-06-12T13:00:00Z",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    likes: [1, 2],
    comments: []
  },
  {
    _id: "blog005",
    title: "AI in Threat Detection: Leveraging Machine Learning",
    category: "AI & Tech",
    content: "Traditional signature-based antiviruses are no longer sufficient. Learn how recurrent neural networks (RNNs) and anomaly detection algorithms analyze network packet logs in real-time to intercept zero-day exploits before they land.",
    author: { name: "Dr. Harsh Verma" },
    createdAt: "2026-06-13T10:00:00Z",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800",
    likes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    comments: [1, 2, 3, 4, 5]
  }
];

const FeaturedBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const readTime = Math.max(1, Math.ceil((blog.content?.split(" ").length || 0) / 150));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="group cursor-pointer bg-[#08101d]/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/25 rounded-[2rem] overflow-hidden flex flex-col md:flex-row transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:translate-y-[-4px]"
    >
      {/* Cover image area */}
      <div className="w-full md:w-[45%] bg-[#040a12] border-r border-white/5 relative flex flex-col justify-between min-h-[260px] overflow-hidden">
        {blog.image ? (
          <>
            <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040a12] via-transparent to-black/30" />
            {/* Category tag inside banner */}
            <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan-500 text-black rounded-md border border-cyan-400">
                FEATURED
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#08101d] via-[#040a12] to-[#01050a] opacity-80" />
            <div className="absolute top-8 left-8 flex flex-col gap-1 z-10">
              <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 rounded-md">TEXT FIRST</span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-2">EDITORIAL</span>
            </div>
            <div className="relative z-10 mt-auto p-8">
              <p className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase mb-1">NO COVER IMAGE</p>
              <h3 className="text-white text-base md:text-lg font-black leading-tight">Clean reading layout</h3>
            </div>
          </>
        )}
      </div>

      {/* Details area */}
      <div className="flex-grow p-8 flex flex-col justify-between md:w-[55%]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md">
              {blog.category || "Cybersecurity"}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {readTime} min read
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-400 transition mb-3 leading-snug">
            {blog.title}
          </h2>

          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-4">
            {blog.content}
          </p>
        </div>

        {/* Author details */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
          <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/35 rounded-full flex items-center justify-center text-xs text-cyan-400 font-bold">
            {blog.author?.name?.[0] || "A"}
          </div>
          <div>
            <p className="text-xs text-white font-bold">{blog.author?.name || "CSC Admin"}</p>
            <p className="text-[9px] text-slate-500 font-mono">{new Date(blog.createdAt).toLocaleDateString("en-IN")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SidebarBlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="group cursor-pointer bg-[#08101d]/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/25 rounded-xl p-4 flex gap-4 transition-all duration-300 shadow-md hover:translate-y-[-1px]"
    >
      <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-white/5 bg-[#040a12] flex items-center justify-center">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
      </div>

      <div className="flex-grow min-w-0 flex flex-col justify-center">
        <span className="text-[9px] text-slate-500 font-mono mb-1">
          {new Date(blog.createdAt).toLocaleDateString("en-IN")}
        </span>
        <h4 className="text-[11px] font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
          {blog.title}
        </h4>
      </div>
    </motion.div>
  );
};

const CompactBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const readTime = Math.max(1, Math.ceil((blog.content?.split(" ").length || 0) / 150));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="group cursor-pointer bg-[#08101d]/60 backdrop-blur-xl border border-white/5 hover:border-cyan-500/25 rounded-2xl p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:translate-y-[-2px]"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 bg-[#040a12] flex items-center justify-center">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
          {blog.category || "Cybersecurity"}
        </span>
        <span className="text-[9px] text-slate-500 font-mono">{readTime} min read</span>
      </div>

      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
        {blog.title}
      </h3>

      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
        {blog.content}
      </p>

      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center text-[10px] text-cyan-400 font-bold">
          {blog.author?.name?.[0] || "A"}
        </div>
        <span className="text-[10px] text-slate-300 font-bold">{blog.author?.name || "Admin"}</span>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWriter, setShowWriter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/blogs`
        );
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        console.log("Fetched blogs:", data);
        if (data && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (err) {
        console.warn("Blog fetch failed, using fallback list.", err);
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = [
    "All",
    "Cybersecurity",
    "Awareness",
    "Ethical Hacking",
    "AI & Tech",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Split into Featured, Sidebar, and remaining
  const featuredBlog = filteredBlogs[0];
  const moreReadsBlogs = filteredBlogs.slice(1, 4); // Show 3 items in the sidebar
  const otherBlogs = filteredBlogs.slice(4); // Show any remaining blogs in a secondary grid

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 relative overflow-x-hidden pt-36 pb-32">
      <NeuralNetwork />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12">
        <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-[0.3em] mb-3 inline-block">
          RESOURCES & RESEARCH //
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
          Club <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,209,255,0.3)]">Blogs.</span>
        </h1>
        <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
          Stay updated with technical articles, writeups, and cybersecurity trends from club members.
        </p>
      </section>

      {/* SEARCH & FILTERS ROW */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[inset_0_0_10px_rgba(0,209,255,0.15)]"
                  : "bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.03] border border-white/5 text-slate-200 text-xs font-mono placeholder:text-slate-600 focus:border-cyan-500/30 focus:bg-slate-900/60 focus:outline-none transition-all duration-300 shadow-inner"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20">
             <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
             <p className="text-cyan-500/70 font-mono text-[10px] uppercase tracking-[0.3em]">
               Accessing Secure Database...
             </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-24 bg-[#0a1628]/30 border border-white/5 rounded-3xl p-10 shadow-inner">
            <span className="text-2xl text-slate-600 block mb-2 font-mono">// NO_RECORDS_FOUND</span>
            <p className="text-xs text-slate-500">
              No technical write-ups found matching your query at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Featured & Additional posts */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">// FEATURED</h3>
                <FeaturedBlogCard blog={featuredBlog} />
              </div>

              {otherBlogs.length > 0 && (
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">// ADDITIONAL WRITEUPS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherBlogs.map((blog) => (
                      <CompactBlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: More Reads & Statistics */}
            <div className="lg:col-span-4 space-y-8">
              {/* More Reads List */}
              {moreReadsBlogs.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">// MORE READS</h3>
                    <span className="text-[9px] font-mono text-cyan-500/40">({moreReadsBlogs.length})</span>
                  </div>
                  
                  <div className="space-y-4">
                    {moreReadsBlogs.map((blog) => (
                      <SidebarBlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </div>
              )}

              {/* Published stats block */}
              <div className="bg-[#08101d]/60 border border-white/5 rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">PUBLISHED</h4>
                <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{filteredBlogs.length}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FLOATING WRITE BUTTON */}
      <div
        className="fixed bottom-8 right-8 z-50"
        onMouseEnter={() => setShowWriter(true)}
        onMouseLeave={() => setShowWriter(false)}
      >
        {/* Circle Button */}
        <button
          onClick={() => navigate("/create-blog")}
          className="w-14 h-14 rounded-full bg-cyan-500 text-[#020617] font-black text-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
        >
          ✍️
        </button>

        {/* Hover aside box */}
        {showWriter && (
          <div className="absolute bottom-16 right-0 w-72 bg-[#050b14]/95 border border-cyan-500/30 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,209,255,0.25)] backdrop-blur-xl">
            <h3 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-2 font-mono">
              // START WRITING
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed font-light">
              Share your cybersecurity knowledge with the CSC NITJ community.
            </p>
            <button
              onClick={() => navigate("/create-blog")}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#020617] font-black text-[10px] uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer shadow-md"
            >
              CREATE NEW POST
            </button>
          </div>
        )}
      </div>
    </div>
  );
}