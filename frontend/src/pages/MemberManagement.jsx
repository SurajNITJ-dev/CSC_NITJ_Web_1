import React, { useState } from "react";

/* ================= MOCK USERS (FRONTEND ONLY) ================= */
const initialUsers = [
  {
    id: "1",
    name: "Amaan Verma",
    email: "amaan@nitj.ac.in",
    role: "user",
    status: "active",
    blogs: 3,
  },
  {
    id: "2",
    name: "Core Admin",
    email: "admin@cscnitj.ac.in",
    role: "admin",
    status: "active",
    blogs: 12,
  },
  {
    id: "3",
    name: "Rohit Sharma",
    email: "rohit@nitj.ac.in",
    role: "user",
    status: "suspended",
    blogs: 0,
  },
];

export default function MemberManagement() {
  const [users, setUsers] = useState(initialUsers);

  /* ================= ACTION HANDLERS ================= */

  const promoteToAdmin = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: "admin" } : u
      )
    );
  };

  const demoteToUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: "user" } : u
      )
    );
  };

  const suspendUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "suspended" } : u
      )
    );
  };

  const activateUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "active" } : u
      )
    );
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#010714] min-h-screen text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-black mb-3">
          Member <span className="text-cyan-400">Management</span>
        </h1>
        <p className="text-slate-400 mb-12 max-w-xl">
          Manage user roles, access levels, and account status.
        </p>

        {/* TABLE */}
        <div className="overflow-x-auto border border-slate-800 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/70 text-slate-400 uppercase tracking-widest text-[11px]">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Blogs</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-800 hover:bg-slate-900/40 transition"
                >
                  {/* NAME */}
                  <td className="px-6 py-4 font-semibold">
                    {user.name}
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-slate-400">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase
                        ${
                          user.role === "admin"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-slate-700/40 text-slate-300"
                        }
                      `}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase
                        ${
                          user.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      `}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* BLOG COUNT */}
                  <td className="px-6 py-4 text-center font-mono">
                    {user.blogs}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right space-x-2">

                    {/* PROMOTE / DEMOTE */}
                    {user.role === "user" ? (
                      <button
                        onClick={() => promoteToAdmin(user.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest
                                   bg-cyan-500/20 text-cyan-400 rounded
                                   hover:bg-cyan-500/30 transition"
                      >
                        Promote
                      </button>
                    ) : (
                      <button
                        onClick={() => demoteToUser(user.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest
                                   bg-yellow-500/20 text-yellow-400 rounded
                                   hover:bg-yellow-500/30 transition"
                      >
                        Demote
                      </button>
                    )}

                    {/* SUSPEND / ACTIVATE */}
                    {user.status === "active" ? (
                      <button
                        onClick={() => suspendUser(user.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest
                                   bg-red-500/20 text-red-400 rounded
                                   hover:bg-red-500/30 transition"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => activateUser(user.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest
                                   bg-green-500/20 text-green-400 rounded
                                   hover:bg-green-500/30 transition"
                      >
                        Activate
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-xs text-slate-500 mt-10 tracking-widest uppercase">
          Administrative actions are logged • CSC NITJ
        </p>
      </div>
    </div>
  );
}
