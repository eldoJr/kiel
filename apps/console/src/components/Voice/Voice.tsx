import { useState } from 'react';
import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { useTheme } from '../../contexts/ThemeContext';
import { Mic, MicOff } from 'lucide-react';

export default function Voice({ onClose }: { onClose?: () => void }) {
  const { effectiveTheme } = useTheme();
  const [isListening, setIsListening] = useState(false);

  return (
    <DraggablePanel id="voice" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-purple-600/40' : 'bg-black/40 border-purple-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none" />
        
        <div className={`drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-purple-600/30' : 'border-purple-500/20'} relative z-10`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>VOICE</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-gradient-to-br from-purple-500/40 to-cyan-500/40 border-2 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-pulse'
                : 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
            }`}
          >
            {isListening ? (
              <Mic size={48} className="text-purple-300" />
            ) : (
              <MicOff size={48} className="text-purple-400/60" />
            )}
          </button>
          
          <p className={`mt-6 text-sm ${effectiveTheme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>
            {isListening ? 'Listening...' : 'Click to activate voice'}
          </p>
          
          {isListening && (
            <div className="mt-4 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 20}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DraggablePanel>
  );
}
