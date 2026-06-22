import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { Zap, CalendarCheck, UserCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Header */}
      <div className="text-center pt-6 pb-16">
        <h1 className="text-4xl font-light text-gray-500 tracking-wider mb-4">
          ABOUT <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">US</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 mb-28 items-center lg:items-start">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img 
              className="relative w-full max-w-[400px] rounded-[2rem] shadow-2xl object-cover transform transition-transform duration-700 hover:scale-[1.02]" 
              src={assets.about_image} 
              alt="About Us" 
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center gap-8 text-gray-600 leading-relaxed text-lg">
          
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-6">
            <p>
              At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. We built this platform to put the power of healthcare back into your hands.
            </p>
            <p>
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-500 tracking-wider">
            WHY <span className="font-bold text-gray-800">CHOOSE US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
              <Zap className="text-indigo-600 group-hover:text-white transition-colors duration-300" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Efficiency</h3>
            <p className="text-gray-500 leading-relaxed">
              Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <CalendarCheck className="text-purple-600 group-hover:text-white transition-colors duration-300" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Convenience</h3>
            <p className="text-gray-500 leading-relaxed">
              Access to a comprehensive network of trusted healthcare professionals in your area.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors duration-300">
              <UserCheck className="text-pink-600 group-hover:text-white transition-colors duration-300" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personalization</h3>
            <p className="text-gray-500 leading-relaxed">
              Tailored recommendations and smart reminders to help you stay on top of your health.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
