import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Calendar, Clock, CheckCircle, Info, Star, Award, ChevronRight } from 'lucide-react';

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol, getDoctors, backendUrl, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState<any>(null);
  const [docSlots, setDocSlots] = useState<any[]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc: any) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/reviews/${docId}`);
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
          toast.error("Please select a valid time slot");
          return;
      }
      if (!slotTime) {
          toast.error("Please select a time");
          return;
      }

      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + '_' + month + '_' + year;
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctors();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
    fetchReviews();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Doctor Profile & Reviews (Takes up 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Doctor Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="relative w-full sm:w-1/3 flex justify-center shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-30"></div>
              <img 
                className="relative bg-indigo-50 w-48 h-48 sm:w-full sm:h-auto rounded-3xl object-cover shadow-xl border-4 border-white" 
                src={docInfo.image} 
                alt={docInfo.name} 
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2 mb-2">
                  {docInfo.name}
                  <img className="w-5 h-5 mt-1" src={assets.verified_icon} alt="Verified" />
                </h1>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-gray-600 font-medium mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                    {docInfo.degree} - {docInfo.speciality}
                  </span>
                  <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                    <Award size={14} />
                    {docInfo.experience} Exp.
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 mb-5">
                  <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1.5 font-bold text-yellow-700">{docInfo.averageRating || "5.0"}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">({reviews.length > 0 ? reviews.length : (docInfo.totalReviews || 0)} reviews)</span>
                </div>
              </div>

              <div>
                <h3 className="flex items-center justify-center sm:justify-start gap-2 text-gray-800 font-bold mb-2">
                  <Info size={18} className="text-indigo-500" />
                  About
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {docInfo.about}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Reviews Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Patient Reviews
            </h2>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100">
                        {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.reviewText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-indigo-50/50 rounded-2xl p-8 text-center border border-indigo-100 border-dashed">
                <p className="text-indigo-400 font-medium">No reviews yet. Be the first to leave a review after your appointment!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget (Takes up 5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-gray-100">
            
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Appointment Fee</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{currencySymbol}{docInfo.fees}</span>
                  <span className="text-gray-500 font-medium text-sm">/ visit</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle size={24} />
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                <Calendar size={18} className="text-indigo-500" />
                Select Date
              </h3>
              
              {/* Horizontal Scroll for Days */}
              <div className="flex gap-3 overflow-x-auto pt-2 pb-4 custom-scrollbar -mx-2 px-2">
                {docSlots.length > 0 && docSlots.map((item, index) => (
                  <div
                    onClick={(e) => { 
                      setSlotIndex(index); 
                      setSlotTime(''); 
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }}
                    key={index}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      slotIndex === index 
                        ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white border-transparent shadow-md transform -translate-y-1' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <p className={`text-xs font-semibold uppercase mb-1 ${slotIndex === index ? 'text-indigo-100' : 'text-gray-400'}`}>
                      {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                    </p>
                    <p className={`text-xl font-bold ${slotIndex === index ? 'text-white' : 'text-gray-800'}`}>
                      {item[0] && item[0].datetime.getDate()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                <Clock size={18} className="text-purple-500" />
                Select Time
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {docSlots.length > 0 && docSlots[slotIndex].length > 0 ? (
                  docSlots[slotIndex].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`py-2 px-1 text-xs sm:text-sm rounded-xl font-medium transition-all duration-200 border ${
                        item.time === slotTime
                          ? 'bg-purple-100 text-purple-700 border-purple-200 shadow-sm'
                          : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-4 text-center text-sm text-red-500 bg-red-50 rounded-xl border border-red-100">
                    No slots available for this day.
                  </div>
                )}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all duration-300 ${
                slotTime 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5 cursor-pointer' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {slotTime ? 'Confirm Appointment' : 'Select a time slot'}
              {slotTime && <ChevronRight size={18} />}
            </button>
            <p className="text-center text-xs text-gray-400 font-medium mt-4">
              You will not be charged until confirmation.
            </p>
          </div>
        </div>

      </div>

      {/* Related Doctors */}
      <div className="mt-16 border-t border-gray-100 pt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Related Doctors</h2>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

    </div>
  );
};

export default Appointment;
