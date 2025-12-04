import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?limit=3");
      const data = await response.json();
      if (data.blogs) {
        // Only get published blogs and limit to 3
        const publishedBlogs = data.blogs
          .filter((blog) => blog.isPublished)
          .slice(0, 3);
        setPosts(publishedBlogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start mb-8 pl-4 md:pl-6">
          <div className="w-20 h-0.5 bg-gray-400 mr-6"></div>
          <h2 className="text-5xl font-serif font-bold text-[#0b2540]">
            From the Blog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-4 md:pl-6">
          {posts.map((post) => (
            <article key={post._id} className="bg-white group">
              <div className="overflow-hidden rounded-lg">
                {post.image ? (
                  <LazyImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-54 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-54 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#072047]">
                {post.title}
              </h3>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center mt-3 text-sm text-yellow-600 font-medium hover:text-yellow-700 focus:outline-none"
              >
                <span>Learn more</span>
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            View All Posts
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
