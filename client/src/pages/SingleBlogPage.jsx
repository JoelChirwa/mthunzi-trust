import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import LazyImage from "../components/LazyImage";

const SingleBlogPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${slug}`);
      const data = await response.json();
      if (response.ok) {
        setPost(data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h2>
          <Link
            to="/blog"
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${post.title} - Mthunzi Trust Blog`}
        description={
          post.excerpt ||
          post.content?.substring(0, 160) ||
          "Read this article from Mthunzi Trust"
        }
        keywords={`${post.title}, Mthunzi Trust blog, Malawi news, community stories`}
        url={`https://www.mthunzitrust.org/blog/${post.slug}`}
        image={post.image || "/og-image.jpg"}
        type="article"
      />
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-white/90 text-sm">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>Mthunzi Trust</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {post.image && (
            <LazyImage
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          )}

          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPage;
