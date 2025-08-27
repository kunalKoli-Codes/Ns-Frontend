import React from 'react';
import { Users, TrendingUp, Award, GraduationCap, CheckCircle, ArrowRight, Star } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      id: 'career-counselling',
      icon: Users,
      title: 'Career Counselling',
      description: 'Personalized guidance to help you discover your ideal career path based on your strengths, interests, and market demands.',
      features: [
        'One-on-one counselling sessions',
        'Personality and aptitude assessments',
        'Career mapping and goal setting',
        'Industry insights and trends analysis',
        'Skill development recommendations',
        'Long-term career planning'
      ],
      process: [
        'Initial consultation and assessment',
        'Detailed analysis of strengths and interests',
        'Market research and opportunity mapping',
        'Personalized career roadmap creation',
        'Regular follow-up and guidance'
      ],
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'finance-consultation',
      icon: TrendingUp,
      title: 'Finance Consultation',
      description: 'Expert financial planning and investment guidance to help you make informed decisions about your education and career investments.',
      features: [
        'Education loan guidance',
        'Investment planning for studies',
        'Budget planning for international education',
        'Scholarship and financial aid assistance',
        'Insurance planning for students',
        'Tax planning strategies'
      ],
      process: [
        'Financial assessment and goal setting',
        'Education cost analysis and planning',
        'Loan application and documentation support',
        'Investment portfolio creation',
        'Ongoing financial monitoring and advice'
      ],
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'job-placement',
      icon: Award,
      title: 'Job Placement Support',
      description: 'Comprehensive job placement assistance with our extensive network of employers and industry connections.',
      features: [
        'Resume building and optimization',
        'Interview preparation and mock sessions',
        'Direct employer connections',
        'Job matching based on skills and preferences',
        'Salary negotiation guidance',
        'Career transition support'
      ],
      process: [
        'Profile evaluation and enhancement',
        'Job market analysis and matching',
        'Application submission and tracking',
        'Interview preparation and coaching',
        'Offer negotiation and onboarding support'
      ],
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'education-guidance',
      icon: GraduationCap,
      title: 'Education Guidance',
      description: 'Complete assistance for admissions in UG, PG, and PhD programs across various disciplines and institutions.',
      features: [
        'Course and university selection',
        'Admission process guidance',
        'Documentation and application support',
        'Entrance exam preparation',
        'Visa and immigration assistance',
        'Accommodation and settlement support'
      ],
      process: [
        'Academic background evaluation',
        'University and course shortlisting',
        'Application preparation and submission',
        'Interview and entrance exam coaching',
        'Admission confirmation and enrollment'
      ],
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      service: 'Career Counselling',
      message: 'RC Consultancy helped me transition from engineering to data science. Their guidance was invaluable.',
      rating: 5
    },
    {
      name: 'Priya Singh',
      service: 'Education Guidance',
      message: 'Got admission in my dream MBA program thanks to their expert guidance and support.',
      rating: 5
    },
    {
      name: 'Amit Sharma',
      service: 'Job Placement',
      message: 'Found my ideal job within 2 months of working with RC Consultancy. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-yellow-400">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive solutions for your career, education, and financial planning needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button
                  onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`${service.textColor} font-medium hover:opacity-80 transition-opacity flex items-center`}
                >
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className={`${service.color} w-20 h-20 rounded-xl flex items-center justify-center mb-8`}>
                  <service.icon className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {service.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer:</h3>
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className={`${service.color} text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  Get Started
                </button>
              </div>
              
              <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                <div className={`${service.bgColor} p-8 rounded-xl`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Process:</h3>
                  <div className="space-y-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex items-start">
                        <div className={`${service.color} text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 text-sm font-semibold`}>
                          {i + 1}
                        </div>
                        <span className="text-gray-700 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Service Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students and professionals who achieved their goals with our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.message}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-yellow-600">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Choose the service that best fits your needs and let our experts guide you to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Book Consultation
            </button>
            <button
              onClick={() => window.open('https://wa.me/918368044957', '_blank')}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}