import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
      image: req.file?.path || "",
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error("Create blog error:", err.message);
    res.status(500).json({
      message: "Blog creation failed",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    // ONLY FETCH APPROVED BLOGS FOR THE PUBLIC
    const blogs = await Blog.find({ status: "approved" }) 
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const moderateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status will be 'approved' or 'rejected'

    // Validate that the status is one of our allowed values
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: `Blog ${status} successfully`, blog });
  } catch (err) {
    res.status(500).json({ message: "Moderation failed" });
  }
};


export const getPendingBlogs = async (req, res) => {
  try {
    // Fetch only pending blogs for the Admin panel
    const blogs = await Blog.find({ status: "pending" })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending blogs" });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};


export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      // ❌ DISLIKE — remove user manually
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // ❤️ LIKE
      blog.likes.push(req.user._id);
    }

    await blog.save();

    // IMPORTANT: return updated blog
    res.json(blog);
  } catch (err) {
    console.error("Like toggle error:", err.message);
    res.status(500).json({
      message: "Failed to toggle like",
    });
  }
};


export const commentBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      user: req.user._id,
      text: req.body.text,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const userId = req.user._id.toString();

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ✅ Allow delete if:
    // 1. Comment author
    // 2. Blog author
    if (
      comment.user.toString() !== userId &&
      blog.author.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.remove();
    await blog.save();

    res.json(blog); // return updated blog
  } catch (err) {
    console.error("Delete comment error:", err.message);
    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};
