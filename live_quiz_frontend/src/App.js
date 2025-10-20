import React from 'react';
import './App.css';
import './styles/theme.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import QuizLobby from './components/Quiz/QuizLobby';
import QuizPlayer from './components/Quiz/QuizPlayer';
import Leaderboard from './components/Leaderboard/Leaderboard';
import { useHashRouter, ROUTES } from './routes';

// PUBLIC_INTERFACE
function App() {
  /** App entry with header, sidebar, and hash-based routing */
  const { route, navigate } = useHashRouter(ROUTES.lobby);

  const renderRoute = () => {
    switch (route.path) {
      case ROUTES.play:
        return <QuizPlayer />;
      case ROUTES.leaderboard:
        return <Leaderboard />;
      case ROUTES.lobby:
      default:
        return <QuizLobby navigate={(r)=>navigate(r)} />;
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <Sidebar current={route.path} onNavigate={(p)=>navigate(p)} />
      <main className="main" id="main">
        {renderRoute()}
      </main>
    </div>
  );
}

export default App;
