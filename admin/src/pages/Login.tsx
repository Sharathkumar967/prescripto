import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { motion } from 'framer-motion';
import { Mail, Lock, UserCog, Stethoscope } from 'lucide-react';

const Login = () => {
  const [state, setState] = useState('Admin');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onSubmit={onSubmitHandler} 
        className="relative z-10 w-full max-w-[400px] px-6"
      >
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col gap-6">
          <div className="text-center mb-2">
            <motion.div
              key={state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner"
            >
              {state === 'Admin' ? <UserCog size={32} strokeWidth={1.5} /> : <Stethoscope size={32} strokeWidth={1.5} />}
            </motion.div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              <span className="text-primary">{state}</span> Portal
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Sign in to access your dashboard</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400 shadow-sm"
                type="email"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400 shadow-sm"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-medium text-[15px] shadow-lg shadow-primary/30 transition-all mt-2"
          >
            Sign In
          </motion.button>

          <div className="mt-4 text-center text-sm text-slate-600">
            {state === 'Admin' ? (
              <p>
                Are you a doctor?{' '}
                <button
                  type="button"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                  onClick={() => setState('Doctor')}
                >
                  Switch to Doctor
                </button>
              </p>
            ) : (
              <p>
                Are you an admin?{' '}
                <button
                  type="button"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                  onClick={() => setState('Admin')}
                >
                  Switch to Admin
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
