import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center text-3xl pt-6 pb-12">
        <h1 className="font-light text-gray-500 tracking-wider">
          CONTACT <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">US</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mb-28 items-center md:items-stretch">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img 
              className="relative w-full max-w-[450px] rounded-3xl shadow-xl object-cover" 
              src={assets.contact_image} 
              alt="Contact Us" 
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            
            {/* Office Info */}
            <div className="mb-10">
              <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
                  <MapPin size={22} />
                </span>
                Our Office
              </h3>
              
              <div className="space-y-4 ml-12">
                <p className="text-gray-600 leading-relaxed font-medium">
                  54709 Willms Station Suite 350, <br />
                  Washington, USA
                </p>
                
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={16} className="text-indigo-400" />
                    <span className="font-medium">+91 9063928320</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={16} className="text-indigo-400" />
                    <span className="font-medium">sharathkumar.g.967@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Careers Info */}
            <div>
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-3">
                <span className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                  <Briefcase size={22} />
                </span>
                Careers at PRESCRIPTO
              </h3>
              
              <div className="ml-12 space-y-6">
                <p className="text-gray-500 font-medium">
                  Learn more about our teams and discover open roles that match your passion.
                </p>
                
                <button className="relative overflow-hidden bg-white text-indigo-600 border border-indigo-200 font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5">
                  Explore Jobs
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
