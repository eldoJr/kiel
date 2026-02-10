import { useState } from 'react';
import Face from '../components/Face';
import StatusPanel from '../components/StatusPanel/StatusPanel';
import ActivityLog from '../components/ActivityLog/ActivityLog';
import Chat from '../components/Chat/Chat';
import Sidebar from '../components/Sidebar';
import type { KielStatus, Activity, Message } from '../types/index';

export default function MainLayout() {
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
    <div className="min-h-screen bg-black text-white">
      <Sidebar onMenuClick={(menu) => setActivePanel(activePanel === menu ? null : menu)} />
      
      {/* Center - Face (Always visible) */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Face status={status} />
          <div className="mt-4">
            <StatusPanel status={status} currentTask={currentTask} />
          </div>
        </div>
      </div>
      
      {/* Left Panel - Chat */}
      {activePanel === 'edit' && (
        <div className="fixed left-24 top-1/2 -translate-y-1/2 w-96 h-[600px] z-40">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl h-full">
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              disabled={status !== 'idle'}
            />
          </div>
        </div>
      )}
      
      {/* Right Panel - Activity Log */}
      {activePanel === 'history' && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 w-96 h-[600px] z-40">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl h-full">
            <ActivityLog activities={activities} />
          </div>
        </div>
      )}
    </div>
  );
}
