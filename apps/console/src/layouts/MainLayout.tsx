import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Face from '../components/KielFace3D';
import ActivityLog from '../components/ActivityLog/ActivityLog';
import Chat from '../components/Chat/Chat';
import Search from '../components/Search/Search';
import Voice from '../components/Voice/Voice';
import Settings from '../components/Settings/Settings';
import Files from '../components/Files/Files';
import Sidebar from '../components/Sidebar';
import type { KielStatus, Activity, Message } from '../types/index';

export default function MainLayout() {
  const { effectiveTheme } = useTheme();
  const [status, setStatus] = useState<KielStatus>('idle');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTask, setCurrentTask] = useState<string>();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    const activity: Activity = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'command',
      message: content,
    };
    
    setActivities((prev) => [...prev, activity]);
    setStatus('thinking');
    setCurrentTask('Processing command...');
    
    // Simulate response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Process completed.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      const responseActivity: Activity = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
        type: 'response',
        message: 'Response generated',
      };
      
      setActivities((prev) => [...prev, responseActivity]);
      setStatus('idle');
      setCurrentTask(undefined);
    }, 2000);
  };

  return (
    <div className={`min-h-screen overflow-hidden ${effectiveTheme === 'light' ? 'bg-white text-gray-900' : 'bg-black text-white'}`}>
      <Sidebar onMenuClick={(menu) => setActivePanel(activePanel === menu ? null : menu)} />
      
      {/* Center - Face (Full Screen) */}
      <div className="fixed inset-0 w-full h-full">
        <Face status={status} />
      </div>
      
      {/* Status Indicator */}
      {currentTask && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3">
            <p className="text-sm text-white/80">{currentTask}</p>
          </div>
        </div>
      )}
      
      {/* Panels */}
      {activePanel === 'search' && (
        <div className="fixed left-20 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <Search onClose={() => setActivePanel(null)} />
        </div>
      )}
      
      {activePanel === 'edit' && (
        <div className="fixed left-20 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            disabled={status !== 'idle'}
            onClose={() => setActivePanel(null)}
          />
        </div>
      )}
      
      {activePanel === 'voice' && (
        <div className="fixed left-20 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <Voice onClose={() => setActivePanel(null)} />
        </div>
      )}
      
      {activePanel === 'settings' && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <Settings onClose={() => setActivePanel(null)} />
        </div>
      )}
      
      {activePanel === 'files' && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <Files onClose={() => setActivePanel(null)} />
        </div>
      )}
      
      {activePanel === 'history' && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 w-96 h-[80vh] max-h-[700px] z-50">
          <ActivityLog activities={activities} onClose={() => setActivePanel(null)} />
        </div>
      )}
    </div>
  );
}
