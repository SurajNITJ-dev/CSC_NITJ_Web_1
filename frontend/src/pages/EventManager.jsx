import React, { useState } from "react";

export default function EventManager() {
  const [events, setEvents] = useState([
    {
      id: "EVT_001",
      title: "Hackathon 2025",
      date: "2025-03-12",
      status: "Published",
    },
    {
      id: "EVT_002",
      title: "Cyber Awareness Workshop",
      date: "2025-04-05",
      status: "Draft",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  /* ---------- CREATE EVENT ---------- */
  const handleCreate = () => {
    if (!title || !date) return;

    setEvents([
      ...events,
      {
        id: `EVT_${String(events.length + 1).padStart(3, "0")}`,
        title,
        date,
        status: "Draft",
      },
    ]);

    setTitle("");
    setDate("");
    setShowForm(false);
  };

  /* ---------- TOGGLE STATUS ---------- */
  const toggleStatus = (id) => {
    setEvents(
      events.map((e) =>
        e.id === id
          ? {
              ...e,
              status: e.status === "Published" ? "Draft" : "Published",
            }
          : e
      )
    );
  };

  /* ---------- DELETE EVENT ---------- */
  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

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
              Control what is live and what is being prepared
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition"
          >
            + New Event
          </button>
        </div>

        {/* CREATE EVENT FORM */}
        {showForm && (
          <div className="mb-16 bg-[#0a1628]/80 border border-cyan-500/20 rounded-2xl p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-6">
              Create New Event
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-4 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-400 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-4 rounded-lg bg-black/50 border border-white/10 text-white focus:border-cyan-400 outline-none"
              />
            </div>

            <button
              onClick={handleCreate}
              className="mt-6 px-8 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition"
            >
              Save as Draft
            </button>
          </div>
        )}

        {/* CURRENT EVENTS */}
        <section className="mb-20">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6">
            Current <span className="text-cyan-400">Live Events</span>
          </h2>

          {publishedEvents.length === 0 ? (
            <p className="text-slate-400">No events are live right now.</p>
          ) : (
            <div className="space-y-4">
              {publishedEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between items-center bg-[#0a1628]/70 border border-green-500/20 rounded-xl p-6"
                >
                  <div>
                    <p className="text-xs font-mono text-green-400">
                      {e.id}
                    </p>
                    <h3 className="text-lg font-bold">{e.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {new Date(e.date).toDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleStatus(e.id)}
                    className="text-xs font-bold uppercase tracking-widest text-yellow-400 hover:underline"
                  >
                    Unpublish
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DRAFT EVENTS */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-widest mb-6">
            Draft <span className="text-yellow-400">Events</span>
          </h2>

          {draftEvents.length === 0 ? (
            <p className="text-slate-400">No draft events.</p>
          ) : (
            <div className="space-y-4">
              {draftEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between items-center bg-[#0a1628]/70 border border-slate-800 rounded-xl p-6"
                >
                  <div>
                    <p className="text-xs font-mono text-yellow-400">
                      {e.id}
                    </p>
                    <h3 className="text-lg font-bold">{e.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {new Date(e.date).toDateString()}
                    </p>
                  </div>

                  <div className="flex gap-6">
                    <button
                      onClick={() => toggleStatus(e.id)}
                      className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:underline"
                    >
                      Publish
                    </button>

                    <button
                      onClick={() => deleteEvent(e.id)}
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
