import React, { useState } from "react";

/* MOCK BLOG DATA (WITH DATE & TIME) */
const initialBlogs = [
  {
    id: 1,
    title: "Understanding SQL Injection",
    author: "Aman Sharma",
    excerpt: "SQL Injection is one of the most common web vulnerabilities...",
    status: "pending",
    createdAt: "2025-09-12T14:32:00",
  },
  {
    id: 2,
    title: "Introduction to Ethical Hacking",
    author: "Riya Verma",
    excerpt: "Ethical hacking helps organizations identify weaknesses...",
    status: "pending",
    createdAt: "2025-09-12T15:10:00",
  },
  {
    id: 3,
    title: "Web Security Fundamentals",
    author: "Admin",
    excerpt: "This article covers the fundamental principles of web security...",
    status: "approved",
    createdAt: "2025-09-11T18:05:00",
  },
];

/* FORMAT DATE */
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const BlogModeration = () => {
  const [blogs, setBlogs] = useState(initialBlogs);

  const updateStatus = (id, newStatus) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, status: newStatus } : blog
      )
    );
  };

  const renderSection = (heading, status) => {
    const filtered = blogs.filter((b) => b.status === status);

    return (
      <section className="mb-20">
        <h2 className="text-xl font-black uppercase tracking-widest mb-6">
          {heading}
        </h2>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm italic">
            No blogs in this section.
          </p>
        )}

        <div className="space-y-4">
          {filtered.map((blog, index) => (
            <div
              key={blog.id}
              className="flex items-start gap-6
                         bg-[#0a1628]/80 backdrop-blur-md
                         border border-white/5
                         px-6 py-4 rounded-xl"
            >
              {/* SERIAL NUMBER */}
              <div className="text-cyan-400 font-mono text-sm">
                #{index + 1}
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-white">
                    {blog.title}
                  </h3>
                  <span className="text-[11px] text-gray-400">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>

                <p className="text-[11px] uppercase tracking-widest text-cyan-400 mb-1">
                  {blog.author}
                </p>

                <p className="text-gray-400 text-sm leading-snug">
                  {blog.excerpt}
                </p>
              </div>

              {/* ACTIONS */}
              {status === "pending" && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => updateStatus(blog.id, "approved")}
                    className="px-4 py-2
                               bg-cyan-500 text-black
                               text-[10px] font-black uppercase tracking-widest
                               rounded-md hover:bg-cyan-400 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(blog.id, "rejected")}
                    className="px-4 py-2
                               bg-red-500/20 text-red-400
                               text-[10px] font-black uppercase tracking-widest
                               rounded-md hover:bg-red-500/40 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-[#010714] min-h-screen text-white pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-16">
          Blog <span className="text-cyan-400">Moderation</span>
        </h1>

        {renderSection("Pending Blogs", "pending")}
        {renderSection("Approved Blogs", "approved")}
        {renderSection("Rejected Blogs", "rejected")}
      </div>
    </div>
  );
};

export default BlogModeration;
