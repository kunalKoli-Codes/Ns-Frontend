import React, { useState } from 'react';
import { BarChart3, BookOpen, MessageSquare, Users, Plus, LogOut, Settings } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import CourseManager from './CourseManager';
import BlogManager from './BlogManager';
import EnquiryManager from './EnquiryManager';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_ADMIN' });
    onNavigate('home');
  };

  const stats = {
    totalCourses: state.courses.length,
    totalBlogs: state.blogs.length,
    totalEnquiries: state.enquiries.length,
    newEnquiries: state.enquiries.filter(e => e.status === 'New').length,
    inProgressEnquiries: state.enquiries.filter(e => e.status === 'In Progress').length,
    resolvedEnquiries: state.enquiries.filter(e => e.status === 'Resolved').length,
    jobLeads: state.jobLeads.length
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'blogs', label: 'Blog Posts', icon: Settings },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'job-leads', label: 'Job Leads', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseManager />;
      case 'blogs':
        return <BlogManager />;
      case 'enquiries':
        return <EnquiryManager />;
      case 'job-leads':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Leads Management</h2>
            <p className="text-gray-600">Job leads management feature coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-8 text-black">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {state.currentUser}!</h1>
              <p className="text-lg opacity-90">Here's an overview of your RC Consultancy dashboard</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BookOpen className="h-12 w-12 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Settings className="h-12 w-12 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Blog Posts</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-12 w-12 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Enquiries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalEnquiries}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-12 w-12 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Job Leads</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.jobLeads}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Status Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">New Enquiries</h3>
                <div className="text-4xl font-bold text-red-500 mb-2">{stats.newEnquiries}</div>
                <p className="text-gray-600">Require attention</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">In Progress</h3>
                <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.inProgressEnquiries}</div>
                <p className="text-gray-600">Being processed</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolved</h3>
                <div className="text-4xl font-bold text-green-500 mb-2">{stats.resolvedEnquiries}</div>
                <p className="text-gray-600">Successfully completed</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-gray-400 mr-2" />
                    <span className="text-gray-600">Add New Course</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-gray-400 mr-2" />
                    <span className="text-gray-600">Write New Blog</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
                  >
                    <MessageSquare className="h-6 w-6 text-gray-400 mr-2" />
                    <span className="text-gray-600">View Enquiries</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4 md:gap-0">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 text-black px-3 py-2 rounded-lg font-bold text-xl">
                RC
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">RC Consultancy Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-600 hover:text-yellow-600 transition-colors"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow">
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-yellow-500 text-black'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
