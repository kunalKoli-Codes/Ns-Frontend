import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, Share2, ArrowRight, BookOpen } from 'lucide-react';
import axios from 'axios';
import { BlogPost } from '../../types';
import { useParams } from 'react-router-dom';

interface BlogSingleProps {
  onNavigate: (page: string, slug?: string) => void;
}

const BlogSingle: React.FC<BlogSingleProps> = ({ onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post and related posts
  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all posts to find the one matching the slug
        const response = await axios.get('/api/blogposts');
        const posts: BlogPost[] = response.data;
        const foundBlog = posts.find((b) => b.slug === slug);

        if (!foundBlog) {
          setError('Blog post not found.');
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        // Fetch related posts
        const related = posts
          .filter((b) => b.id !== foundBlog.id && b.category === foundBlog.category)
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (err) {
        setError('Failed to fetch blog post. Please try again.');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [slug]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Career':
        return 'bg-blue-100 text-blue-800';
      case 'Finance':
        return 'bg-green-100 text-green-800';
      case 'Education':
        return 'bg-purple-100 text-purple-800';
      case 'Job Tips':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-4">{error || "The article you're looking for doesn't exist."}</p>
          <button
            onClick={() => onNavigate('blog')}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(blog.category)}`}>
              {blog.category}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>

          <p className="text-xl text-gray-600 mb-8">{blog.excerpt}</p>

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-12"
        />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {paragraph.slice(2, -2)}
                </h3>
              );
            } else if (paragraph.includes('**')) {
              const parts = paragraph.split('**');
              return (
                <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                  {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
                </p>
              );
            } else if (paragraph.match(/^\d+\./)) {
              return (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed font-medium">
                  {paragraph}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              );
            }
          })}
        </div>

        {/* Author Section */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-start space-x-4">
              <img
                src={
                  blog.author === 'Suraj Verma'
                    ? 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg'
                    : 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
                }
                alt={blog.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{blog.author}</h4>
                <p className="text-sm text-gray-600 mb-4">
                  {blog.author === 'Suraj Verma'
                    ? 'Founder & Senior Consultant at RC Consultancy. Expert in career counselling and education guidance with 8+ years of experience.'
                    : 'Co-Founder & Finance Consultant at RC Consultancy. Specializes in financial planning and job placement with 6+ years of experience.'}
                </p>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                >
                  Learn more about {blog.author}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={relatedBlog.featuredImage}
                    alt={relatedBlog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                          relatedBlog.category
                        )}`}
                      >
                        {relatedBlog.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(relatedBlog.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{relatedBlog.excerpt}</p>
                    <button
                      onClick={() => onNavigate('blog', relatedBlog.slug)}
                      className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors flex items-center"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert Guidance?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Our experienced consultants are ready to help you with personalized advice for your career and education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Schedule Consultation
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSingle;