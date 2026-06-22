import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-3xl px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-2xl shadow-primary/20">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-white/10 blur-[80px]"></div>
      </div>

      {/* left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] md:mb-[-30px] relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-[1.1] tracking-tight"
        >
          Book Appointment <br />
          <span className="text-blue-100">With Trusted Doctors</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-4 text-white text-base font-medium opacity-90"
        >
          <div className="relative">
            <img className="w-28 relative z-10 drop-shadow-md" src={assets.group_profiles} alt="Profiles" />
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
          </div>
          <p className="leading-relaxed text-blue-50">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment hassle-free.
          </p>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#speciality"
          className="flex items-center gap-3 bg-white px-8 py-3.5 rounded-full text-slate-800 font-semibold text-sm m-auto md:m-0 hover:bg-slate-50 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 group mt-2"
        >
          Book appointment
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative flex justify-end">
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full md:absolute bottom-0 right-0 h-auto rounded-lg max-w-lg lg:max-w-xl drop-shadow-2xl z-10"
          src={assets.header_img}
          alt="Doctors"
        />
      </div>
    </div>
  );
};

export default Header;
