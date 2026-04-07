import React, { useState } from 'react';
import { Home } from './screens/Home';
import { Session } from './screens/Session';
import { DailyReview } from './screens/DailyReview';
import { Topics } from './screens/Topics';
import { Stats } from './screens/Stats';
import { Settings } from './screens/Settings';
import './index.css';

function App() {
  const [view, setView] = useState('Home');
  const [sessionTopic, setSessionTopic] = useState(null);

  const navigate = (newView, params = {}) => {
    if (params.topic) setSessionTopic(params.topic);
    setView(newView);
  };

  return (
    <div className="app-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {view === 'Home' && <Home navigate={navigate} />}
      {view === 'Session' && <Session navigate={navigate} topic={sessionTopic} />}
      {view === 'DailyReview' && <DailyReview navigate={navigate} />}
      {view === 'Topics' && <Topics navigate={navigate} />}
      {view === 'Stats' && <Stats navigate={navigate} />}
      {view === 'Settings' && <Settings navigate={navigate} />}
    </div>
  );
}

export default App;
