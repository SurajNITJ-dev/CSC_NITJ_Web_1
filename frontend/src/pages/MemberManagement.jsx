import React, { useState, useEffect } from "react";

export default function MemberManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch real users from MongoDB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load members", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // Handle Database Updates (Promote, Demote, Suspend, Activate)
  const handleUpdate = async (id, updateData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // Update local state so UI changes immediately without refresh
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, ...updatedUser } : u))
        );
      }
    } catch (err) {
      alert("System error during update.");
    }
  };

  if (loading) return <div className="text-cyan-400 p-20">Accessing Database...</div>;

  return (
    <div className="bg-[#010714] min-h-screen text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-3">
          Member <span className="text-cyan-400">Management</span>
        </h1>
        <p className="text-slate-400 mb-12">Authorized Personnel Access Only</p>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/70 text-slate-400 uppercase tracking-widest text-[11px]">
              <tr>
                <th className="px-6 py-4 text-left">Identify</th>
                <th className="px-6 py-4 text-center">Security Level</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-800 hover:bg-slate-900/40">
                  <td className="px-6 py-4">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.role === "admin" ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700/40 text-slate-300"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {/* Role Toggles */}
                    <button 
                      onClick={() => handleUpdate(user._id, { role: user.role === "admin" ? "user" : "admin" })}
                      className="text-[10px] uppercase font-bold text-cyan-500 hover:underline"
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button>
                    
                    {/* Status Toggles */}
                    <button 
                      onClick={() => handleUpdate(user._id, { status: user.status === "active" ? "suspended" : "active" })}
                      className={`text-[10px] uppercase font-bold hover:underline ${
                        user.status === "active" ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {user.status === "active" ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}