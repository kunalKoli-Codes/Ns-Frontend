import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleWhatsApp = () => {
    window.open('https://wa.me/918810524651', '_blank');
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-yellow-500 text-black px-3 py-2 rounded-lg font-bold text-xl">
                NS
              </div>
              <div>
                <div className="text-lg font-bold">NC Consultancy</div>
                <div className="text-sm text-gray-400">Career • Finance • Education</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering careers through expert guidance in education, finance, and job placement services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <LinkedIn className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', page: 'about' },
                { name: 'Services', page: 'services' },
                { name: 'Courses', page: 'courses' },
                { name: 'Blog', page: 'blog' },
                { name: 'Contact', page: 'contact' },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-300 hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Career Counselling</li>
              <li>Finance Consultation</li>
              <li>Job Placement</li>
              <li>Education Guidance</li>
              <li>Course Admissions</li>
              <li>Exam Preparation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  5E/68, 2nd Floor, NIT-5,<br />
                  Faridabad, Haryana
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-gray-300">+91 8810524651</div>
                  <div className="text-gray-300">+91 7065346462</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">nayastack@gmail.com</span>
              </div>
              <button
                onClick={handleWhatsApp}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 RC Consultancy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}