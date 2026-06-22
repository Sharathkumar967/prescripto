import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { assets } from '../assets/assets_frontend/assets';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-gray-100">
        
        {/* Left Side: Branding / Gradient */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-10 flex flex-col justify-between text-white relative overflow-hidden hidden md:flex">
          {/* Glassmorphism overlays */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-10 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <ShieldCheck className="text-indigo-600" size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight">Prescripto</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Your health, <br/>
              <span className="text-indigo-200">reimagined.</span>
            </h1>
            <p className="text-indigo-100 text-lg leading-relaxed mb-8 max-w-sm">
              Connect with top-tier medical professionals instantly. Experience the future of personalized healthcare today.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <img className="h-10" src={assets.group_profiles} alt="Doctor Profiles" />
              <p className="text-sm font-medium text-indigo-50">Join thousands of patients.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center md:text-left mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {state === 'Sign Up' ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-500 text-base">
                {state === 'Sign Up' 
                  ? 'Sign up to start booking your appointments.' 
                  : 'Please enter your details to access your account.'}
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              
              {state === 'Sign Up' && (
                <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required={state === 'Sign Up'}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                {state === 'Login' && (
                  <div className="flex justify-end mt-2">
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</a>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-200 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{state === 'Sign Up' ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>

            </form>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-center text-gray-600 text-sm">
                {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account yet?"}
                <button
                  type="button"
                  onClick={() => {
                    setState(state === 'Sign Up' ? 'Login' : 'Sign Up');
                    // Clear errors/passwords if desired
                  }}
                  className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500 transition-colors focus:outline-none"
                >
                  {state === 'Sign Up' ? 'Log in here' : 'Sign up now'}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
