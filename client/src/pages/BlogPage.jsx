import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LazyImage from "../components/LazyImage";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 8;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.blogs) {
        setPosts(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate index of the last post
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate index of the first post
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get current posts
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(posts.length / postsPerPage))
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Blog - Mthunzi Trust"
        description="Read the latest news, updates, and stories from Mthunzi Trust. Discover how we're empowering communities in Malawi through education, entrepreneurship, and sustainable development."
        keywords="Mthunzi Trust blog, Malawi news, community stories, youth empowerment stories, NGO updates, education news Malawi"
        url="https://www.mthunzitrust.org/blog"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Our Blog
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto">
            Latest news, updates, and stories from Mthunzi Trust.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No blog posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden bg-gray-200">
                  {post.image ? (
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
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
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0b2540] mb-3 line-clamp-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-yellow-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1 text-lg">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 mt-auto text-lg"
                  >
                    Read Article
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {posts.length > postsPerPage && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-yellow-600 border-gray-300"
              }`}
            >
              &larr; Previous
            </button>

            <span className="text-gray-600 font-medium">
              Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === Math.ceil(posts.length / postsPerPage)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-yellow-600 border-gray-300"
              }`}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
