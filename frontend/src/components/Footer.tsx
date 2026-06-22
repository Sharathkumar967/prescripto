import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <footer className="text-gray-700 py-10">
      <div className="flex flex-col md:grid md:grid-cols-4 gap-14 mb-10 mt-24 text-sm border-t border-gray-200 pt-16">
        {/* Logo and Description */}
        <div className="md:col-span-2 md:pr-10">
          <img src={assets.logo} alt="Company Logo" className="mb-4 w-40" />
          <p className="text-gray-600 leading-relaxed">
            Prescripto is a premium healthcare platform designed to seamlessly connect patients with top-tier medical professionals. Book appointments effortlessly, manage your health records securely, and experience the future of telemedicine from the comfort of your home.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-4">COMPANY</p>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-500">
                About us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-500">
                Contact us
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-blue-500">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-4">GET IN TOUCH</p>
          <ul className="space-y-2">
            <li className="hover:text-blue-500">+91 9063928320</li>
            <li className="hover:text-blue-500">sharathkumar.g.967@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 pt-6 text-center text-sm">
        <p className="text-gray-600">
          Copyright © 2024 <span className="font-semibold">Sharath Kumar</span> - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
