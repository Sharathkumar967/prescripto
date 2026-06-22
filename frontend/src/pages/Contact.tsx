import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { MapPin, Phone, Mail, Briefcase, Clock, AlertTriangle, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Header */}
      <div className="text-center pt-6 pb-16">
        <h1 className="text-4xl font-light text-gray-500 tracking-wider mb-4">
          CONTACT <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">US</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Have questions or need assistance? We're here to help. Reach out to our team using the form below or through our direct contact channels.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-28">
        
        {/* Left Column: Contact Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Sharathkumar"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="sharathkumar@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Contact Details */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8">
          
          {/* Image */}
          <div className="relative group rounded-3xl overflow-hidden shadow-xl hidden sm:block">
            <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors duration-500"></div>
            <img 
              className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-700" 
              src={assets.contact_image} 
              alt="Contact Us" 
            />
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex-1">
            
            {/* Emergency Info */}
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 flex items-start gap-3">
              <AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm font-medium leading-relaxed">
                For medical emergencies, please do not use this form. Call your local emergency services (e.g., 911) immediately.
              </p>
            </div>

            {/* Office Info */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-800 mb-5 flex items-center gap-3">
                <span className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                  <MapPin size={18} />
                </span>
                Our Office
              </h3>
              <div className="space-y-4 ml-11">
                <p className="text-gray-600 text-sm font-medium">
                  54709 Willms Station Suite 350, <br /> Washington, USA
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">+91 9063928320</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={14} className="text-indigo-400" />
                    <span className="text-sm font-medium">sharathkumar.g.967@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-3">
                <span className="bg-orange-50 text-orange-500 p-2 rounded-lg">
                  <Clock size={18} />
                </span>
                Business Hours
              </h3>
              <div className="ml-11 text-sm text-gray-600 space-y-2 font-medium">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-gray-800">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-gray-800">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Careers */}
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-3">
                <span className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                  <Briefcase size={18} />
                </span>
                Careers
              </h3>
              <div className="ml-11">
                <p className="text-gray-500 text-sm mb-4">
                  Learn more about our teams and job openings.
                </p>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 group">
                  Explore Jobs 
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
