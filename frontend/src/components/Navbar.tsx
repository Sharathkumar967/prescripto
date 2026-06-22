import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Calendar, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 bg-white/100 backdrop-blur-md border-b border-b-slate-200 ${scrolled ? 'py-3 shadow-sm' : 'py-5 mb-5'}`}>
      <div className="flex items-center justify-between text-sm w-full px-4 sm:px-6 md:px-10 lg:px-16 mx-auto max-w-[1800px]">
        <motion.img 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')} 
          className="w-44 cursor-pointer" 
          src={assets.logo} 
          alt="Prescripto Logo" 
        />

        <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          {[
            { name: 'HOME', path: '/' },
            { name: 'ALL DOCTORS', path: '/doctors' },
            { name: 'ABOUT', path: '/about' },
            { name: 'CONTACT', path: '/contact' }
          ].map((item, idx) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <NavLink to={item.path} className={({isActive}) => `py-1 relative group transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" 
                src={userData.image} 
                alt="Profile" 
              />
              <div className="absolute top-full right-0 pt-4 z-20 hidden group-hover:block w-48">
                <div className="glass rounded-xl flex flex-col overflow-hidden shadow-lg border border-slate-200">
                  <div onClick={() => navigate('my-profile')} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-slate-700">
                    <UserCircle size={18} />
                    <span>My Profile</span>
                  </div>
                  <div onClick={() => navigate('my-appointments')} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-slate-700">
                    <Calendar size={18} />
                    <span>Appointments</span>
                  </div>
                  <div className="h-px bg-slate-200 w-full"></div>
                  <div onClick={logout} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors cursor-pointer">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="bg-primary hover:bg-primary-dark transition-colors text-white px-8 py-2.5 rounded-full font-medium hidden md:block shadow-md shadow-primary/20"
            >
              Create account
            </motion.button>
          )}

          <button onClick={() => setShowMenu(true)} className="md:hidden p-2 text-slate-700">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-slate-100">
              <img className="w-36" src={assets.logo} alt="" />
              <button onClick={() => setShowMenu(false)} className="p-2 text-slate-700 bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <ul className="flex flex-col gap-2 mt-5 px-5 text-lg font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'All Doctors', path: '/doctors' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map(item => (
                <NavLink key={item.name} onClick={() => setShowMenu(false)} to={item.path}>
                  {({isActive}) => (
                    <div className={`px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-slate-700'}`}>
                      {item.name}
                    </div>
                  )}
                </NavLink>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
