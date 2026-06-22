import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

import { assets } from '../../assets/assets_admin/assets';

const AllApointments = () => {
  const { aToken, appointments, appointmentPagination, getAllAppointments, cancelAppointment } = useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      // Default to page 1, limit 10
      getAllAppointments(1, 10);
    }
  }, [aToken]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= appointmentPagination.totalPages) {
      getAllAppointments(newPage, 10);
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-lg font-medium">All Appointments</p>
        {appointmentPagination?.totalCount > 0 && (
          <p className="text-sm text-gray-500">Total: {appointmentPagination.totalCount} appointments</p>
        )}
      </div>
      
      <div className="bg-white border rounded text-sm min-h-[60vh] flex flex-col justify-between">
        <div className="overflow-y-auto">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>patient</p>
            <p>Age</p>
            <p>Date & time</p>
            <p>Doctors</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">
                {(appointmentPagination.currentPage - 1) * 10 + index + 1}
              </p>

              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full bg-gray-200" src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>

              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>

              <p>
                {currency} {item.amount}
              </p>

              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No appointments found.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {appointmentPagination?.totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-6 py-4 bg-gray-50 rounded-b">
            <p className="text-sm text-gray-500">
              Showing Page <span className="font-semibold">{appointmentPagination.currentPage}</span> of <span className="font-semibold">{appointmentPagination.totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(appointmentPagination.currentPage - 1)}
                disabled={appointmentPagination.currentPage === 1}
                className="px-4 py-2 border rounded text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1 mx-2 hidden sm:flex">
                {[...Array(appointmentPagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                      appointmentPagination.currentPage === i + 1
                        ? 'bg-primary text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(appointmentPagination.currentPage + 1)}
                disabled={appointmentPagination.currentPage === appointmentPagination.totalPages}
                className="px-4 py-2 border rounded text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApointments;
