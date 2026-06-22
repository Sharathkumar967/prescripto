import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const VideoConsultation = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  if (!roomName) {
    return <div>Invalid Room</div>;
  }

  return (
    <div className="h-screen w-full bg-slate-900 pt-20 flex flex-col">
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Prescripto Telemedicine</h2>
        <button 
          onClick={() => navigate('/my-appointments')}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition-colors"
        >
          Leave Call
        </button>
      </div>
      <div className="flex-1 w-full">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
          }}
          userInfo={{
            displayName: userData?.name || 'Patient',
            email: userData?.email || ''
          }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
          }}
          getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; }}
        />
      </div>
    </div>
  );
};

export default VideoConsultation;
