import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, NavLink, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Reintroduced AppProvider
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import WhatsAppButton from './components/UI/WhatsAppButton';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Services from './components/Pages/Services';
import Courses from './components/Pages/Courses';
import Blog from './components/Pages/Blog';
import BlogSingle from './components/Pages/BlogSingle';
import Contact from './components/Pages/Contact';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

const AppWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (page: string, slug?: string) => {
    navigate(slug ? `/${page}/${slug}` : `/${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header currentPage="home" onNavigate={handleNavigate} />
                <main>
                  <Home onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/about"
            element={
              <>
                <Header currentPage="about" onNavigate={handleNavigate} />
                <main>
                  <About onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header currentPage="services" onNavigate={handleNavigate} />
                <main>
                  <Services onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route
            path="/courses"
            element={
              <>
                <Header currentPage="courses" onNavigate={handleNavigate} />
                <main>
                  <Courses onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Header currentPage="blog" onNavigate={handleNavigate} />
                <main>
                  <Blog onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <>
                <Header currentPage="blog" onNavigate={handleNavigate} />
                <main>
                  <BlogSingle onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header currentPage="contact" onNavigate={handleNavigate} />
                <main>
                  <Contact onNavigate={handleNavigate} />
                </main>
                <Footer onNavigate={handleNavigate} />
                <WhatsAppButton />
              </>
            }
          />
          <Route path="/admin-login" element={<AdminLogin onNavigate={handleNavigate} />} />
          <Route path="/admin" element={<AdminDashboard onNavigate={handleNavigate} />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;