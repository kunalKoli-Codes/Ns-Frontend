import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, GraduationCap, Filter, Search } from 'lucide-react';
import axios from 'axios';
import { Course } from '../../types';

interface CoursesProps {
  onNavigate: (page: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onNavigate }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'UG' | 'PG' | 'PhD'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('process.env.VITE_API_URL/api/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses. Please try again.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'UG', 'PG', 'PhD'] as const;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UG':
        return 'bg-blue-100 text-blue-800';
      case 'PG':
        return 'bg-green-100 text-green-800';
      case 'PhD':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: courses.length,
    ug: courses.filter((c) => c.category === 'UG').length,
    pg: courses.filter((c) => c.category === 'PG').length,
    phd: courses.filter((c) => c.category === 'PhD').length,
  };

  return (
    <div className="min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-7xl mx-auto mt-4" role="alert">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-12 max-w-7xl mx-auto">
          <p className="text-gray-500 text-lg">Loading courses...</p>
        </div>
      )}

      {/* Hero Section */}
      {!loading && (
        <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Available <span className="text-yellow-400">Courses</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8">
                Explore our comprehensive range of undergraduate, postgraduate, and doctoral programs
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.total}+</div>
                  <div className="text-sm text-gray-300">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.ug}</div>
                  <div className="text-sm text-gray-300">UG Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.pg}</div>
                  <div className="text-sm text-gray-300">PG Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{stats.phd}</div>
                  <div className="text-sm text-gray-300">PhD Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      {!loading && (
        <section className="py-8 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={loading}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Courses Grid */}
      {!loading && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <BookOpen className="h-6 w-6 text-yellow-500" />
                      </div>

                      {/* Course Info */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                      <p className="text-gray-600 mb-6">{course.description}</p>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Duration: {course.duration}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Eligibility:</strong> {course.eligibility}
                        </div>
                        {course.fees && (
                          <div className="text-sm text-gray-700">
                            <strong>Fees:</strong> {course.fees}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => onNavigate('contact')}
                          className="flex-1 bg-yellow-500 text-black py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                          disabled={loading}
                        >
                          Get Info
                        </button>
                        <button
                          onClick={() => window.open('https://wa.me/918368044957', '_blank')}
                          className="flex-1 border-2 border-yellow-500 text-yellow-600 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors"
                          disabled={loading}
                        >
                          Enquire
                        </button>
                      </div>

                      {/* Featured Badge */}
                      {course.featured && (
                        <div className="mt-4 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Featured Course
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Course Categories Info */}
      {!loading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Course Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand our different program levels and what they offer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-blue-50 p-8 rounded-xl">
                <div className="bg-blue-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Undergraduate (UG)</h3>
                <p className="text-gray-600 mb-4">
                  Bachelor's degree programs for students who have completed their 12th standard. 
                  Duration: 3-4 years depending on the course.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• B.Tech, B.E. (Engineering)</li>
                  <li>• BBA, BCA (Business & IT)</li>
                  <li>• MBBS, BDS (Medical)</li>
                  <li>• B.Com, B.Sc (Commerce & Science)</li>
                </ul>
              </div>

              <div className="text-center bg-green-50 p-8 rounded-xl">
                <div className="bg-green-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Postgraduate (PG)</h3>
                <p className="text-gray-600 mb-4">
                  Master's degree programs for graduates looking to specialize in their field. 
                  Duration: 1-2 years.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• MBA, PGDM (Management)</li>
                  <li>• M.Tech, M.E. (Engineering)</li>
                  <li>• M.Sc, M.Com (Science & Commerce)</li>
                  <li>• MA (Arts & Humanities)</li>
                </ul>
              </div>

              <div className="text-center bg-purple-50 p-8 rounded-xl">
                <div className="bg-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Doctorate (PhD)</h3>
                <p className="text-gray-600 mb-4">
                  Research-based programs for those pursuing academic or research careers. 
                  Duration: 3-5 years.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PhD in Engineering</li>
                  <li>• PhD in Management</li>
                  <li>• PhD in Sciences</li>
                  <li>• PhD in Humanities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!loading && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing the Right Course?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our expert counselors are here to guide you in selecting the perfect course that aligns with your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
                disabled={loading}
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
                disabled={loading}
              >
                Our Services
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Courses;
