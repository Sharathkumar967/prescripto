import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white to-indigo-50/50 pt-20 pb-10 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description (Takes up 5 cols) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
            <img src={assets.logo} alt="Prescripto Logo" className="w-44" />
            <p className="text-gray-500 leading-relaxed text-sm font-medium pr-4">
              Prescripto is a premium healthcare platform designed to seamlessly connect patients with top-tier medical professionals. Experience the future of telemedicine from the comfort of your home.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 transform hover:-translate-y-1">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (Takes up 3 cols) */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h3 className="text-gray-900 font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-gray-500 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2 group font-medium">
                  <ChevronRight size={14} className="text-transparent group-hover:text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-500 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2 group font-medium">
                  <ChevronRight size={14} className="text-transparent group-hover:text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">About us</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-500 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2 group font-medium">
                  <ChevronRight size={14} className="text-transparent group-hover:text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">Contact us</span>
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-500 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2 group font-medium">
                  <ChevronRight size={14} className="text-transparent group-hover:text-indigo-600 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">Privacy policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info (Takes up 4 cols) */}
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
            <h3 className="text-gray-900 font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-gray-500 font-medium text-sm">
              <li className="flex items-center gap-3 hover:text-indigo-600 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                +91 9063928320
              </li>
              <li className="flex items-center gap-3 hover:text-indigo-600 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                sharathkumar.g.967@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative pt-8 border-t border-gray-200/60">
          <p className="text-center text-sm text-gray-500 font-medium">
            Copyright © {new Date().getFullYear()} <span className="font-bold text-gray-800">Sharath Kumar</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
