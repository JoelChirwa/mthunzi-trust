import Blog from '../models/Blog.js';

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, image, tags, category, isPublished } = req.body;

    const blog = new Blog({
      title,
      content,
      excerpt,
      image,
      tags,
      category,
      isPublished,
      author: req.user._id, // Assuming auth middleware attaches user to req
      publishedAt: isPublished ? Date.now() : null
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    // Filter for published blogs if not admin (or just show all for now and filter on frontend? Better to filter here)
    // For public API, we usually only want published blogs. 
    // But for admin dashboard, we want all.
    // Let's add a query param 'all' for admin.
    
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Blog.countDocuments({ ...keyword });
    const blogs = await Blog.find({ ...keyword })
      .populate('author', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post by ID
// @route   GET /api/blogs/id/:id
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, image, tags, category, isPublished } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.excerpt = excerpt || blog.excerpt;
      blog.image = image || blog.image;
      blog.tags = tags || blog.tags;
      blog.category = category || blog.category;
      blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
      
      if (blog.isPublished && !blog.publishedAt) {
          blog.publishedAt = Date.now();
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
