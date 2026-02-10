import { useState } from 'react';
import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { useTheme } from '../../contexts/ThemeContext';
import type { Message } from '../../types/index';
import { Send } from 'lucide-react';

interface ChatProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  onClose?: () => void;
}

export default function Chat({ messages, onSendMessage, disabled, onClose }: ChatProps) {
  const [input, setInput] = useState('');
  const { effectiveTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <DraggablePanel id="chat" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-cyan-600/40' : 'bg-black/40 border-cyan-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        <div className="drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-cyan-600/30' : 'border-cyan-500/20'} relative z-10">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-cyan-700' : 'text-cyan-300'}`}>INTERFACE</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <p className={`text-sm ${effectiveTheme === 'light' ? 'text-cyan-600/60' : 'text-cyan-500/50'}`}>Initialize conversation with KIEL...</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 backdrop-blur-sm ${
                    message.role === 'user'
                      ? effectiveTheme === 'light' 
                        ? 'bg-gradient-to-br from-cyan-600/40 to-purple-600/40 border border-cyan-500/60 text-cyan-900'
                        : 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 text-cyan-100'
                      : effectiveTheme === 'light'
                        ? 'bg-white/60 border border-cyan-600/30 text-gray-800'
                        : 'bg-black/40 border border-cyan-500/20 text-cyan-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        <form onSubmit={handleSubmit} className={`p-4 border-t ${effectiveTheme === 'light' ? 'border-cyan-600/30' : 'border-cyan-500/20'} relative z-10`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={disabled}
              placeholder="Enter command..."
              className={`flex-1 ${effectiveTheme === 'light' ? 'bg-white/60 border-cyan-600/40 text-gray-900 placeholder-cyan-600/50' : 'bg-black/40 border-cyan-500/30 text-cyan-100 placeholder-cyan-500/40'} border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 transition-all`}
            />
            <button
              type="submit"
              disabled={disabled || !input.trim()}
              className="bg-gradient-to-br from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/40 hover:to-purple-500/40 disabled:from-gray-700/30 disabled:to-gray-700/30 disabled:cursor-not-allowed border border-cyan-400/50 text-cyan-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center gap-2"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </DraggablePanel>
  );
}
