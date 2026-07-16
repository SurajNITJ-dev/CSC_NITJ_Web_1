import React, { useState, useEffect } from "react";

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  // 1. FETCH ALL EVENTS FROM BACKEND ON MOUNT
  useEffect(() => {
    const fetchAdminEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events from server", err);
      }
    };
    fetchAdminEvents();
  }, [token]);

  // 2. CREATE NEW EVENT (Saves to MongoDB)
  const handleCreate = async () => {
    if (!title || !date) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // 'description' and 'time' are required by your new backend model
        body: JSON.stringify({ 
          title, 
          date, 
          description: description || "New official CSC event.", 
          time: "TBD" 
        })
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents([...events, newEvent]);
        setTitle(""); 
        setDate(""); 
        setDescription("");
        setShowForm(false);
      }
    } catch (err) {
      alert("Error: Could not save the event.");
    }
  };

  // 3. TOGGLE STATUS (Published <-> Draft)
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Published" ? "Draft" : "Published";
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setEvents(events.map((e) =>
          e._id === id ? { ...e, status: newStatus } : e
        ));
      }
    } catch (err) {
      alert("Failed to update event status.");
    }
  };

  // 4. DELETE EVENT FROM DATABASE
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setEvents(events.filter((e) => e._id !== id));
      }
    } catch (err) {
      alert("Critical error: Deletion failed.");
    }
  };

  // Filter logic remains the same, but now uses MongoDB '_id'
  const publishedEvents = events.filter((e) => e.status === "Published");
  const draftEvents = events.filter((e) => e.status === "Draft");

  return (
    <div className="bg-[#010714] min-h-screen text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-14">
          <div>
            <h1 className="text-4xl font-black">
              Event <span className="text-cyan-400">Management</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Authorized Control Panel: Modify live and pending events
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition"
          >
            {showForm ? "Cancel" : "+ New Event"}
          </button>
        </div>

        {/* CREATE EVENT FORM */}
        {showForm && (
          <div className="mb-16 bg-[#0a1628]/80 border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-6">
              Initialize New Database Entry
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-4 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-400 outline-none transition"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-4 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-400 outline-none transition"
              />
            </div>
            
            <textarea
                placeholder="Event Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 mb-6 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-400 outline-none transition h-32"
            />

            <button
              onClick={handleCreate}
              className="px-8 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition"
            >
              Commit to Database
            </button>
          </div>
        )}

        {/* CURRENT EVENTS SECTION */}
        <section className="mb-20">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6">
            Current <span className="text-cyan-400">Live Events</span>
          </h2>

          {publishedEvents.length === 0 ? (
            <p className="text-slate-500 italic">No events currently public on portal.</p>
          ) : (
            <div className="space-y-4">
              {publishedEvents.map((e) => (
                <div key={e._id} className="flex justify-between items-center bg-[#0a1628]/70 border border-green-500/20 rounded-xl p-6">
                  <div>
                    <p className="text-[10px] font-mono text-green-400 uppercase tracking-tighter">EVT_{e._id.slice(-6)}</p>
                    <h3 className="text-lg font-bold">{e.title}</h3>
                    <p className="text-slate-400 text-sm">{new Date(e.date).toDateString()}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(e._id, e.status)}
                    className="text-xs font-bold uppercase tracking-widest text-yellow-400 hover:underline"
                  >
                    Unpublish
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DRAFT EVENTS SECTION */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-widest mb-6">
            Draft <span className="text-yellow-400">Events</span>
          </h2>

          {draftEvents.length === 0 ? (
            <p className="text-slate-500 italic">No prepared drafts found.</p>
          ) : (
            <div className="space-y-4">
              {draftEvents.map((e) => (
                <div key={e._id} className="flex justify-between items-center bg-[#0a1628]/70 border border-slate-800 rounded-xl p-6">
                  <div>
                    <p className="text-[10px] font-mono text-yellow-400 uppercase tracking-tighter">EVT_{e._id.slice(-6)}</p>
                    <h3 className="text-lg font-bold">{e.title}</h3>
                    <p className="text-slate-400 text-sm">{new Date(e.date).toDateString()}</p>
                  </div>
                  <div className="flex gap-6">
                    <button
                      onClick={() => toggleStatus(e._id, e.status)}
                      className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:underline"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => deleteEvent(e._id)}
                      className="text-xs font-bold uppercase tracking-widest text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}