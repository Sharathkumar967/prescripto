import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Mail, Phone, MapPin, User, Calendar, Camera, Save, Edit3 } from 'lucide-react';

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      // image && formData.append("image", image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          token,
        },
      });

      if (data.success) {
        toast.success(data.message || 'Profile updated successfully.');
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-4xl mx-auto pb-12 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Premium Banner */}
        <div className="h-48 sm:h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
          
          {/* Action Buttons Top Right */}
          <div className="absolute top-6 right-6">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="flex items-center gap-2 bg-white text-indigo-600 px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Save size={18} /> Save Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/40 px-5 py-2.5 rounded-full font-semibold shadow-sm hover:bg-white/30 transition-all duration-300"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            )}
          </div>
          
          {/* Avatar Container */}
          <div className="absolute -bottom-16 left-8 sm:left-12 flex items-end">
            {isEdit ? (
              <label htmlFor="image" className="relative cursor-pointer group block rounded-full">
                <img
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white object-cover shadow-lg transition-all duration-300 group-hover:brightness-75 bg-white"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-black/40 border-4 border-transparent">
                  <Camera className="text-white w-8 h-8" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
            ) : (
              <div className="relative rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                <img 
                  className="w-32 h-32 sm:w-36 sm:h-36 object-cover" 
                  src={userData.image} 
                  alt="Profile" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-24 px-8 sm:px-12 pb-12">
          
          {/* Name Section */}
          <div className="mb-10">
            {isEdit ? (
              <input
                className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 w-full max-w-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                type="text"
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                value={userData.name}
                placeholder="Your Name"
              />
            ) : (
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{userData.name}</h1>
            )}
            <p className="text-gray-500 font-medium mt-1 ml-1 text-sm">Patient Account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Info Card */}
            <div className="bg-gray-50/80 rounded-2xl p-7 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-6 flex items-center gap-2">
                 Contact Information
              </h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-500">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Email Address</p>
                    <p className="text-gray-800 font-medium">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-500">
                    <Phone size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Phone Number</p>
                    {isEdit ? (
                      <input
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        type="text"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setUserData((prev) => ({ ...prev, phone: value }));
                          }
                        }}
                        value={userData.phone}
                        placeholder="Phone number"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-500">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Residential Address</p>
                    {isEdit ? (
                      <div className="flex flex-col gap-3 mt-1">
                        <input
                          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                            }))
                          }
                          value={userData.address.line1}
                          type="text"
                          placeholder="Line 1"
                        />
                        <input
                          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                            }))
                          }
                          value={userData.address.line2}
                          type="text"
                          placeholder="Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {userData.address.line1}
                        {userData.address.line2 && <><br /> {userData.address.line2}</>}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-gray-50/80 rounded-2xl p-7 border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-6">
                Basic Information
              </h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-500">
                    <User size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Gender</p>
                    {isEdit ? (
                      <select
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm cursor-pointer"
                        onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                        value={userData.gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.gender}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-500">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Date of Birth</p>
                    {isEdit ? (
                      <input
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 mt-1 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm cursor-pointer"
                        type="date"
                        onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                        value={userData.dob}
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.dob}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
