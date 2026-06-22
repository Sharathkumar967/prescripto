import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, getDoctors } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ appointmentId: '', docId: '', rating: 5, reviewText: '' });

  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const slotDateFormat = (slotDate) => {
    console.log('slotDate', slotDate);
    const dateArray = slotDate.split('_');
    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]); // monthIndex should not subtract 1
    const year = dateArray[2];

    return `${day} ${months[monthIndex]} ${year}`; // Correct format
  };

  const navigate = useNavigate();

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      console.log('Data of appointments cancel:', data);
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
        getDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {
            headers: { token },
          });

          if (data.success) {
            getUsersAppointments();
            navigate('/my-appointments');
          }
        } catch (error) {
          console.log(error);
          toast.error('Payment failed. Please try again.');
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    console.log('Appointment ID:', appointmentId);
    console.log('Backend URL:', backendUrl);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching razorpay payment gateway:', error.response || error);
      toast.error('Failed to initialize payment. Please try again.');
    }
  };

  const submitReview = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-review`,
        { ...reviewData },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setShowReviewModal(false);
        setReviewData({ appointmentId: '', docId: '', rating: 5, reviewText: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="tex-sm text-neutral-700">Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border rounded text-store-500 bg-indigo-50">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}

              {!item.cancelled && !item.isCompleted && item.meetingRoom && (
                <button
                  onClick={() => navigate(`/call/${item.meetingRoom}`)}
                  className="text-sm text-indigo-500 text-center sm:min-w-48 py-2 border border-indigo-500 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  Join Video Call
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}

              {item.isCompleted && (
                <div className="flex flex-col gap-2">
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                  <button 
                    onClick={() => {
                      setReviewData({ ...reviewData, appointmentId: item._id, docId: item.docData._id });
                      setShowReviewModal(true);
                    }}
                    className="sm:min-w-48 py-2 border border-yellow-500 rounded text-yellow-500 hover:bg-yellow-50 transition-colors"
                  >
                    Leave Review
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Rate your experience</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 stars)</label>
              <select 
                value={reviewData.rating}
                onChange={(e) => setReviewData({...reviewData, rating: Number(e.target.value)})}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-primary"
              >
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea 
                rows={4}
                value={reviewData.reviewText}
                onChange={(e) => setReviewData({...reviewData, reviewText: e.target.value})}
                placeholder="How was your consultation?"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-primary"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={submitReview}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
