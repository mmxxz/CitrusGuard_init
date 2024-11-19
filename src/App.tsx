import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Import pages
import DetectionPage from './pages/Detection';
import ChatPage from './pages/Chat';
import MultimodalChatPage from './pages/MultimodalChat';
import KnowledgePage from './pages/Knowledge';
import HistoryPage from './pages/History';
import AlertsPage from './pages/Alerts';
import SettingsPage from './pages/Settings';
import HelpPage from './pages/Help';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex pt-16">
          <Sidebar isOpen={isSidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="container mx-auto p-6">
              <Routes>
                <Route path="/" element={<DetectionPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/multimodal" element={<MultimodalChatPage />} />
                <Route path="/knowledge-base" element={<KnowledgePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;