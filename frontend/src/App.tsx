import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

import VideoConsultation from './pages/VideoConsultation';

const App = () => {
  return (
    <div className="w-full">
      <ToastContainer />
      <Navbar />
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 mx-auto max-w-[1800px]">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/call/:roomName" element={<VideoConsultation />} />
      </Routes>

      <Footer />
      </div>
    </div>
  );
};

export default App;
