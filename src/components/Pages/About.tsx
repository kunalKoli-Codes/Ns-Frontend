import React from 'react';
import { Award, Users, Target, Heart, CheckCircle, Star } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const achievements = [
    { number: '5000+', label: 'Students Guided' },
    { number: '150+', label: 'Universities Connected' },
    { number: '95%', label: 'Success Rate' },
    { number: '8+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every consultation and guidance we provide.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honest and transparent approach in all our educational and career advice.'
    },
    {
      icon: Users,
      title: 'Student-Centric',
      description: 'Every decision we make puts our students\' success at the center.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Constantly evolving our methods to provide the best guidance possible.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-yellow-400">NS Consultancy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Empowering dreams through expert guidance in career counselling, finance consultation, 
              job placement, and educational guidance since 2016.
            </p>
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                RC Consultancy was founded with a simple yet powerful vision: to bridge the gap between 
                ambitious students and their dream careers. What started as a small consulting firm has 
                grown into a trusted name in educational and career guidance.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We understand that choosing the right career path and educational institution can be 
                overwhelming. That's why we've dedicated ourselves to providing personalized, expert 
                guidance that takes into account each student's unique strengths, interests, and aspirations.
              </p>
              <div className="space-y-4">
                {[
                  'Personalized career counselling sessions',
                  'Comprehensive financial planning guidance',
                  'Direct connections with top employers',
                  'Expert admission guidance for all levels'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg"
                alt="Team meeting"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute inset-0 bg-yellow-500 opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to student success
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultant Profiles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Consultants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team of consultants brings years of expertise in education, 
              career guidance, and financial planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Suraj Verma */}
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                alt="Suraj Verma"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Suraj Verma</h3>
              <p className="text-yellow-600 font-semibold mb-4">Founder & Senior Consultant</p>
              <p className="text-gray-700 mb-6">
                With over 8 years of experience in educational consulting and career guidance, 
                Suraj has helped thousands of students achieve their academic and professional goals. 
                He specializes in engineering and management program admissions and has extensive 
                connections with top universities across India.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Specialization:</strong> Career Counselling, Education Guidance</p>
                <p><strong>Experience:</strong> 8+ Years</p>
                <p><strong>Education:</strong> MBA, Career Counselling Certification</p>
              </div>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Deepanshu Verma */}
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                alt="Deepanshu Verma"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Deepanshu Verma</h3>
              <p className="text-yellow-600 font-semibold mb-4">Co-Founder & Finance Consultant</p>
              <p className="text-gray-700 mb-6">
                Deepanshu brings expertise in financial planning and job placement services. 
                He has successfully placed over 2000 candidates in their dream jobs and provides 
                comprehensive financial guidance to help students and professionals make informed 
                decisions about their education investments.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Specialization:</strong> Finance Consultation, Job Placement</p>
                <p><strong>Experience:</strong> 6+ Years</p>
                <p><strong>Education:</strong> M.Com, Financial Planning Certification</p>
              </div>
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at RC Consultancy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-xl shadow-lg">
                <div className="bg-yellow-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of successful students who trusted RC Consultancy with their career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Schedule Consultation
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}