import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { useTheme } from '../../contexts/ThemeContext';
import type { Activity } from '../../types/index';
import { Terminal, CheckCircle, Zap, XCircle } from 'lucide-react';

interface ActivityLogProps {
  activities: Activity[];
  onClose?: () => void;
}

export default function ActivityLog({ activities, onClose }: ActivityLogProps) {
  const { effectiveTheme } = useTheme();
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'command': return <Terminal size={14} />;
      case 'response': return <CheckCircle size={14} />;
      case 'action': return <Zap size={14} />;
      case 'error': return <XCircle size={14} />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'command': return 'text-cyan-400';
      case 'response': return 'text-green-400';
      case 'action': return 'text-purple-400';
      case 'error': return 'text-red-400';
    }
  };

  return (
    <DraggablePanel id="activity" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-purple-600/40' : 'bg-black/40 border-purple-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none" />
        
        <div className={`drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-purple-600/30' : 'border-purple-500/20'} relative z-10`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>ACTIVITY LOG</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          {activities.length === 0 ? (
            <p className={`text-sm ${effectiveTheme === 'light' ? 'text-purple-600/60' : 'text-purple-500/50'}`}>No activity recorded...</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className={`flex items-start gap-3 p-2 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-purple-600/20 hover:border-purple-600/40' : 'bg-black/20 border-purple-500/10 hover:border-purple-500/30'} border transition-all`}>
                <span className={`${getActivityColor(activity.type)} mt-0.5`}>
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>{activity.message}</p>
                  <span className={`text-xs ${effectiveTheme === 'light' ? 'text-purple-600/70' : 'text-purple-500/60'}`}>
                    {activity.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DraggablePanel>
  );
}
