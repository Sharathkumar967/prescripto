import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, Stethoscope, Clock, CheckCircle2, XCircle } from 'lucide-react';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    dashData && (
      <div className="m-5 md:m-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {/* Doctors Card */}
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Stethoscope size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">{dashData.doctors}</p>
                <p className="text-slate-500 font-medium">Total Doctors</p>
              </div>
            </div>
          </motion.div>

          {/* Appointments Card */}
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                <CalendarCheck size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">{dashData.appointments}</p>
                <p className="text-slate-500 font-medium">Appointments</p>
              </div>
            </div>
          </motion.div>

          {/* Patients Card */}
          <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Users size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">{dashData.patients}</p>
                <p className="text-slate-500 font-medium">Total Patients</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Latest Bookings Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-8 py-6 border-b border-slate-100 bg-white/50">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Clock size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Latest Bookings</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {dashData.latestAppointments.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.05) }}
                className="flex items-center px-8 py-4 gap-4 hover:bg-slate-50/80 transition-colors group" 
                key={index}
              >
                <div className="relative">
                  <img className="rounded-full w-12 h-12 object-cover border-2 border-white shadow-sm" src={item.docData.image} alt={item.docData.name} />
                  <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
                </div>
                
                <div className="flex-1">
                  <p className="text-slate-800 font-semibold group-hover:text-primary transition-colors">{item.docData.name}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{slotDateFormat(item.slotDate)}</p>
                </div>

                <div className="flex items-center justify-end min-w-[100px]">
                  {item.cancelled ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-semibold">
                      <XCircle size={14} />
                      <span>Cancelled</span>
                    </div>
                  ) : item.isCompleted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all focus:outline-none"
                      title="Cancel Appointment"
                    >
                      <XCircle size={20} strokeWidth={2} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            
            {dashData.latestAppointments.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                <Clock size={40} className="mx-auto mb-3 text-slate-300" strokeWidth={1} />
                <p>No recent bookings found.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  );
};

export default Dashboard;
