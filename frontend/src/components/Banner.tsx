import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-primary to-indigo-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 shadow-2xl shadow-primary/20 relative overflow-hidden">
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[100%] rounded-full bg-white/10 blur-[80px] pointer-events-none"></div>

      {/* left Side */}
      <div className="flex-1 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10 flex flex-col justify-center items-start">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2 text-blue-100">With 100+ Trusted Doctors</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-slate-800 font-semibold px-10 py-4 rounded-full mt-8 shadow-xl shadow-white/10 hover:bg-slate-50 transition-all duration-300"
        >
          Create account
        </motion.button>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 lg:w-[450px] relative justify-end items-end">
        <img
          className="w-full h-auto object-contain max-w-md relative z-10 drop-shadow-2xl"
          src={assets.appointment_img}
          alt="Doctors"
          style={{ transform: 'translateY(10px)' }} // Pulls the image down slightly to sit perfectly on the bottom border
        />
      </div>
    </div>
  );
};

export default Banner;
