import { useEffect, useState } from 'react';
import DyteClient from '@dytesdk/web-core';
import { DyteMeeting } from '@dyte-in/react-ui-kit';
import { config } from './config';

function App() {
  console.log('DyteClient', DyteClient);
  const [meeting, setMeeting] = useState<DyteClient>();

  useEffect(() => {
    const init = async () => {
      if (meeting) {
        return;
      }
      const res = await fetch('https://api.cluster.dyte.in/auth/anonymous');
      if (res.ok) {
        const { authToken } = await res.json();
        const meeting = await DyteClient.init({
          authToken,
          roomName: 'avbigx-hemnqy',
        });
        setMeeting(meeting);
      }
    };
    init();
  }, []);

  return (
    <DyteMeeting
      meeting={meeting}
      config={config}
      style={{ width: '100%', height: '100vh' }}
      showSetupScreen={true}
    />
  );
}

export default App;
