import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { DoctorContext } from '../../context/DoctorContext';

const VideoConsultation = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const { profileData } = useContext(DoctorContext);

  if (!roomName) {
    return <div>Invalid Room</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] h-screen w-full bg-slate-900 flex flex-col">
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Prescripto Telemedicine (Doctor Portal)</h2>
        <button 
          onClick={() => navigate('/doctor-appointments')}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition-colors"
        >
          End Call
        </button>
      </div>
      <div className="flex-1 w-full">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableModeratorIndicator: false, // Doctor is moderator
            startScreenSharing: false,
            enableEmailInStats: false
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
          }}
          userInfo={{
            displayName: profileData?.name ? `Dr. ${profileData.name}` : 'Doctor',
            email: profileData?.email || ''
          }}
          getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
        />
      </div>
    </div>
  );
};

export default VideoConsultation;
