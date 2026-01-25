import React, { useState, useEffect } from "react";

const BlogModeration = () => {
  // 1. Initialize with an empty array
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  // 2. Fetch real data from your backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetching all blogs to filter them by status in the UI
        const res = await fetch("http://localhost:5000/api/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pendingRes = await fetch("http://localhost:5000/api/blogs/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const approvedData = await res.json();
        const pendingData = await pendingRes.json();
        
        // Combine them for the local state filter
        setBlogs([...approvedData, ...pendingData]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchBlogs();
  }, [token]);

  // 3. Update the backend status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/moderate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state so the UI reflects the change immediately
        setBlogs((prev) =>
          prev.map((blog) =>
            blog._id === id ? { ...blog, status: newStatus } : blog
          )
        );
      }
    } catch (err) {
      alert("Moderation failed");
    }
  };

  /* --- RENDER LOGIC UPDATES --- */
  // Use _id instead of id for MongoDB compatibility
  const renderSection = (heading, status) => {
    const filtered = blogs.filter((b) => b.status === status);

    return (
      <section className="mb-20">
        <h2 className="text-xl font-black uppercase tracking-widest mb-6">{heading}</h2>
        {filtered.length === 0 && <p className="text-gray-500 italic">No blogs found.</p>}

        <div className="space-y-4">
          {filtered.map((blog, index) => (
            <div key={blog._id} className="..."> {/* Use blog._id */}
              <div className="flex-1">
                <h3 className="text-base font-bold">{blog.title}</h3>
                {/* Ensure author is handled as an object if populated */}
                <p className="text-cyan-400">{blog.author?.name || "Unknown Author"}</p> 
              </div>

              {status === "pending" && (
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(blog._id, "approved")} className="...">
                    Approve
                  </button>
                  <button onClick={() => updateStatus(blog._id, "rejected")} className="...">
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
        <h1 className="text-4xl font-black uppercase mb-16">
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