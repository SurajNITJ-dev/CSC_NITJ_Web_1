import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function CreateBlog() {
  const navigate = useNavigate();

  // ================== STATE ==================
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Cybersecurity");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================== TIPTAP EDITOR ==================
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  // ================== STATS ==================
  const plainText = content.replace(/<[^>]*>/g, "");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  // ================== HANDLERS ==================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (editor.isEmpty) {
      setError("Blog content cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to publish a blog");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to publish blog");

      navigate("/blog");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================== JSX ==================
  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 sm:px-6 py-24">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-14">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Create <span className="text-cyan-400">Blog</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl">
          Share your cybersecurity insights with the CSC community.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT — EDITOR */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-black/40 backdrop-blur-xl
            border border-cyan-500/20
            rounded-2xl p-6 sm:p-8
            space-y-7
            shadow-[0_0_40px_rgba(34,211,238,0.15)]
          "
        >
          <h2 className="text-lg font-black uppercase tracking-widest text-cyan-400">
            Writer Console
          </h2>

          {/* TITLE */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a powerful title..."
              className="w-full mt-2 p-4 rounded-lg bg-black/50 border border-white/10"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 p-4 rounded-lg bg-black/50 border border-white/10"
            >
              <option>Cybersecurity</option>
              <option>Awareness</option>
              <option>Ethical Hacking</option>
              <option>AI & Tech</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400">
              Cover Image (optional)
            </label>

            <label className="
              mt-3 flex flex-col items-center justify-center
              border-2 border-dashed border-cyan-500/30
              rounded-xl p-6 cursor-pointer
              hover:border-cyan-400 transition
            ">
              <span className="text-sm text-gray-400">Click to upload image</span>
              <span className="text-[10px] text-gray-500 mt-1">JPG / PNG</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* CONTENT */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400">
              Content
            </label>

            <div className="mt-2 bg-black/50 border border-white/10 rounded-lg overflow-hidden">
              {/* TOOLBAR */}
              <div className="flex gap-2 p-2 border-b border-white/10 text-cyan-400 text-sm">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("bold")
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  B
               </button>
               <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("italic")
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  H2
                </button>

                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  H3
                </button>

                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("bulletList")
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  •
                </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded ${
                  editor.isActive("orderedList")
                    ? "bg-cyan-400 text-black"
                    : "text-cyan-400 hover:bg-white/10"
                }`}
              >
                1.
              </button>

               <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`px-2 py-1 rounded ${
                  editor.isActive("code")
                    ? "bg-cyan-400 text-black"
                    : "text-cyan-400 hover:bg-white/10"
                }`}
              >
                {"</>"}
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("codeBlock")
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  {"{ }"}
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={`px-2 py-1 rounded ${
                    editor.isActive("blockquote")
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  ❝
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().undo().run()}
                  className="px-2 py-1 rounded text-cyan-400 hover:bg-white/10"
                >
                  ↶
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().redo().run()}
                  className="px-2 py-1 rounded text-cyan-400 hover:bg-white/10"
                >
                  ↷
                </button>

              </button>
              </div>

              <EditorContent
                editor={editor}
                className="min-h-[220px] p-4 text-white cursor-text focus:outline-none"
              />
            </div>
          </div>

          {/* STATS */}
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>Words: {words}</span>
            <span>Reading Time: {readTime} min</span>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-cyan-500 text-black font-black uppercase text-xs tracking-widest hover:bg-cyan-400 disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>

        {/* RIGHT — PREVIEW */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-44 sm:h-56 object-cover rounded-xl mb-6"
            />
          )}

          {/* PREVIEW CATEGORY */}
          <span className="text-[10px] uppercase tracking-widest text-cyan-400">
            {category}
          </span>

          {/* PREVIEW TITLE (THIS WAS MISSING) */}
          <h3 className="text-2xl sm:text-3xl font-black mt-3 mb-4">
            {title || "Blog Title"}
          </h3>

          {/* PREVIEW CONTENT */}
          <div
            className="text-gray-400 leading-relaxed text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html: content || "<p>Your blog content will appear here...</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}
