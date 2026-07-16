import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
    comments: []
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
    comments: []
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
    comments: []
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
    comments: []
  }
];

export default function BlogDetail() {
  const { slug } = useParams(); // blog _id
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH BLOG ================= */
  const fetchBlog = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}`
      );
      if (!res.ok) throw new Error("Blog not found in DB");
      const data = await res.json();
      if (data && data.title) {
        setBlog(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.warn("Failed to fetch blog from backend, using fallback content:", err);
      const fallbackBlog = fallbackBlogs.find((b) => b._id === slug);
      if (fallbackBlog) {
        setBlog(fallbackBlog);
      } else {
        setBlog(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  /* ================= READING PROGRESS ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LIKE BLOG ================= */
  const handleLike = async () => {
    if (!token) {
      alert("Please login to like this blog");
      return;
    }

    try {
      setActionLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}/like`,
        {
          method: "POST", // ✅ MUST BE POST
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Like endpoint error");
      const updatedBlog = await res.json();

      // ✅ Update UI with backend response
      setBlog(updatedBlog);
    } catch (err) {
      console.error("Like failed on server, updating local likes", err);
      // Fallback local liking to keep UI alive
      setBlog(prev => {
        if (!prev) return prev;
        const currentLikes = prev.likes || [];
        const isAlreadyLiked = currentLikes.includes("temp_user");
        const nextLikes = isAlreadyLiked
          ? currentLikes.filter(id => id !== "temp_user")
          : [...currentLikes, "temp_user"];
        return {
          ...prev,
          likes: nextLikes
        };
      });
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= ADD COMMENT ================= */
  const handleComment = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to comment");
      return;
    }

    if (!commentText.trim()) return;

    try {
      setActionLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (!res.ok) throw new Error("Comment endpoint error");
      setCommentText("");
      fetchBlog();
    } catch (err) {
      console.error("Comment failed on server, appending locally", err);
      // Fallback local commenting to keep UI alive
      setBlog(prev => {
        if (!prev) return prev;
        const currentComments = prev.comments || [];
        const newComment = {
          _id: `local_comment_${Date.now()}`,
          text: commentText,
          createdAt: new Date().toISOString(),
          user: { name: "CSC Member" }
        };
        return {
          ...prev,
          comments: [...currentComments, newComment]
        };
      });
      setCommentText("");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) return;

    try {
      setActionLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete comment endpoint error");
      const updatedBlog = await res.json();

      // update UI instantly
      setBlog(updatedBlog);
    } catch (err) {
      console.error("Delete comment failed on server, removing locally", err);
      setBlog(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: (prev.comments || []).filter(c => c._id !== commentId)
        };
      });
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-cyan-400 font-mono text-xs uppercase tracking-widest">
        Loading secure database records...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white font-mono text-xs uppercase tracking-widest">
        Record not found
      </div>
    );
  }

  let userId = null;
  if (token) {
    try {
      userId = JSON.parse(atob(token.split(".")[1])).id;
    } catch (e) {
      userId = null;
    }
  }

  const isLiked =
    userId && blog?.likes?.some((id) => id.toString() === userId);

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen relative pt-12">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
        <div
          className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-12 px-6 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-[#08101d]/30 to-[#020617]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="text-cyan-400 text-xs font-mono uppercase tracking-[0.2em] hover:text-cyan-300 transition-colors"
          >
            ← Back to Blogs
          </Link>

          <h1 className="mt-8 text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-slate-400 font-mono">
            <span className="text-white font-bold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 font-bold flex items-center justify-center">
                {blog.author?.name?.[0] || "A"}
              </span>
              {blog.author?.name || "CSC Contributor"}
            </span>
            <span>·</span>
            <span>{new Date(blog.createdAt).toDateString()}</span>
            <span>·</span>

            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              disabled={actionLoading}
              className={`flex items-center gap-2 transition cursor-pointer font-bold
                ${
                  isLiked
                    ? "text-red-400 hover:text-red-300"
                    : "text-cyan-400 hover:text-cyan-300"
                }
                ${actionLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isLiked ? "♥" : "♡"} {blog.likes?.length || 0}
            </button>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      {blog.image && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover rounded-[2rem] border border-white/5 shadow-2xl"
            />
          </div>
        </section>
      )}

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 hidden lg:block sticky top-40 h-fit">
          <div className="bg-[#08101d]/60 border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/35 rounded-full flex items-center justify-center text-cyan-400 font-black mb-4">
              {blog.author?.name?.[0] || "A"}
            </div>
            <h4 className="text-white font-bold text-sm">
              {blog.author?.name || "CSC Contributor"}
            </h4>
            <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">
              NITJ Contributor
            </p>
          </div>
        </aside>

        <article className="lg:col-span-9 max-w-none text-slate-300 text-sm md:text-base leading-relaxed space-y-6">
          {blog.content
            .split("\n")
            .filter(Boolean)
            .map((p, i) => (
              <p key={i} className="mb-4 text-justify font-light text-slate-300">
                {p}
              </p>
            ))}
        </article>
      </main>

      {/* COMMENTS */}
      <section className="max-w-4xl mx-auto px-6 pb-24 pt-12 border-t border-white/5">
        <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">
          Discussion ({blog.comments?.length || 0})
        </h3>

        {/* ADD COMMENT */}
        <form onSubmit={handleComment} className="mb-10">
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              token
                ? "Write your comment..."
                : "Login to write a comment"
            }
            disabled={!token}
            className="
              w-full p-4 rounded-xl
              bg-[#08101d]/60 border border-white/5
              text-slate-200 text-sm
              focus:border-cyan-500/30 focus:outline-none transition-colors
              disabled:opacity-50 placeholder:text-slate-600
            "
          />
          <button
            type="submit"
            disabled={!token || actionLoading}
            className="
              mt-3 px-6 py-2.5 rounded-lg
              bg-cyan-500 text-black
              text-[10px] font-black uppercase tracking-widest
              hover:bg-cyan-400 transition-colors cursor-pointer
              disabled:opacity-50
            "
          >
            Post Comment
          </button>
        </form>

        {/* COMMENT LIST */}
        <div className="space-y-4">
          {blog.comments?.map((c) => {
            const canDelete =
                userId &&
                (
                  c.user?._id?.toString() === userId ||
                  blog.author?._id?.toString() === userId
                );

            return (
              <div
                key={c._id}
                className="bg-[#08101d]/40 border border-white/5 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                      {c.user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-white font-bold text-xs">
                        {c.user?.name || "CSC Member"}
                      </p>
                      <p className="text-[9px] text-slate-500 font-mono">
                        {new Date(c.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      disabled={actionLoading}
                      className="text-red-400 text-[10px] font-mono hover:text-red-300 cursor-pointer"
                    >
                      DELETE
                    </button>
                  )}
                </div>

                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed pl-11">{c.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="text-center py-12 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em] border-t border-white/5">
        // AWARENESS IS THE FIRST LINE OF CYBER DEFENSE • CSC NITJ
      </footer>
    </div>
  );
}