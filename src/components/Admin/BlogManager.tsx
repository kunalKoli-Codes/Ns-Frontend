import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import axios from 'axios';
import { BlogPost } from '../../types';

const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Career' | 'Finance' | 'Education' | 'Job Tips'>('All');
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Career',
    author: 'Suraj Verma',
    publishedAt: new Date().toISOString().split('T')[0],
    featuredImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    seoTitle: '',
    seoDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts on mount
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/blogposts');
        setBlogPosts(response.data);
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again.');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  const filteredBlogs = blogPosts.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || blog.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const blogData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.excerpt,
    };

    try {
      if (editingBlog) {
        // Update existing blog post
        const response = await axios.put(`/api/blogposts/${editingBlog.id}`, blogData);
        setBlogPosts(blogPosts.map((blog) => (blog.id === editingBlog.id ? response.data : blog)));
      } else {
        // Create new blog post
        const response = await axios.post('/api/blogposts', blogData);
        setBlogPosts([...blogPosts, response.data]);
      }
      resetForm();
    } catch (err) {
      setError(editingBlog ? 'Failed to update blog post.' : 'Failed to create blog post.');
      console.error('Error submitting blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Career',
      author: 'Suraj Verma',
      publishedAt: new Date().toISOString().split('T')[0],
      featuredImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      seoTitle: '',
      seoDescription: '',
    });
    setShowForm(false);
    setEditingBlog(null);
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData(blog);
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setError(null);
      setLoading(true);
      try {
        await axios.delete(`/api/blogposts/${id}`);
        setBlogPosts(blogPosts.filter((blog) => blog.id !== id));
      } catch (err) {
        setError('Failed to delete blog post.');
        console.error('Error deleting blog post:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-generate slug when title changes
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
    }
  };

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

  const featuredImages = [
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
    'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg',
    'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  ];

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      )}

      {/* Header */}
      {!loading && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              disabled={loading}
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="All">All Categories</option>
              <option value="Career">Career</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Job Tips">Job Tips</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {blogPosts.filter((b) => b.category === 'Career').length}
              </div>
              <div className="text-sm text-gray-600">Career</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {blogPosts.filter((b) => b.category === 'Finance').length}
              </div>
              <div className="text-sm text-gray-600">Finance</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">
                {blogPosts.filter((b) => b.category === 'Education').length}
              </div>
              <div className="text-sm text-gray-600">Education</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-500">
                {blogPosts.filter((b) => b.category === 'Job Tips').length}
              </div>
              <div className="text-sm text-gray-600">Job Tips</div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter blog post title"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="URL slug (auto-generated)"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="Career">Career</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Job Tips">Job Tips</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <select
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="Suraj Verma">Suraj Verma</option>
                    <option value="Deepanshu Verma">Deepanshu Verma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date *</label>
                  <input
                    type="date"
                    name="publishedAt"
                    required
                    value={formData.publishedAt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image *</label>
                <select
                  name="featuredImage"
                  required
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  disabled={loading}
                >
                  {featuredImages.map((image, index) => (
                    <option key={image} value={image}>
                      Featured Image {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Brief description of the blog post"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  name="content"
                  required
                  rows={12}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Write your blog post content here. Use **text** for bold formatting."
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="SEO optimized title (defaults to title)"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                  <input
                    type="text"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="SEO meta description (defaults to excerpt)"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
                  disabled={loading}
                >
                  {editingBlog ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Posts List */}
      {!loading && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Blog Posts ({filteredBlogs.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(blog.category)}`}>
                            {blog.category}
                          </span>
                          <span>By {blog.author}</span>
                          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                          className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                          title="Preview"
                          disabled={loading}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors p-2"
                          title="Edit"
                          disabled={loading}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600 hover:text-red-900 transition-colors p-2"
                          title="Delete"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogManager;