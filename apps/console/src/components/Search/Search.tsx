import { useState } from 'react';
import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { useTheme } from '../../contexts/ThemeContext';
import { Search as SearchIcon, X } from 'lucide-react';

export default function Search({ onClose }: { onClose?: () => void }) {
  const { effectiveTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [results] = useState<string[]>([]);

  return (
    <DraggablePanel id="search" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-cyan-600/40' : 'bg-black/40 border-cyan-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        <div className={`drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-cyan-600/30' : 'border-cyan-500/20'} relative z-10`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-cyan-700' : 'text-cyan-300'}`}>SEARCH</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="p-4 relative z-10">
          <div className="relative">
            <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 ${effectiveTheme === 'light' ? 'text-cyan-600/60' : 'text-cyan-500/50'}`} size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands, files, actions..."
              className={`w-full ${effectiveTheme === 'light' ? 'bg-white/60 border-cyan-600/40 text-gray-900 placeholder-cyan-600/50' : 'bg-black/40 border-cyan-500/30 text-cyan-100 placeholder-cyan-500/40'} border rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all`}
            />
            {query && (
              <button onClick={() => setQuery('')} className={`absolute right-3 top-1/2 -translate-y-1/2 ${effectiveTheme === 'light' ? 'text-cyan-600/60 hover:text-cyan-700' : 'text-cyan-500/50 hover:text-cyan-400'}`}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
          {results.length === 0 ? (
            <p className={`text-sm text-center mt-8 ${effectiveTheme === 'light' ? 'text-cyan-600/60' : 'text-cyan-500/50'}`}>No results found...</p>
          ) : (
            results.map((result, i) => (
              <div key={i} className={`p-3 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-cyan-600/20 hover:border-cyan-600/40' : 'bg-black/20 border-cyan-500/10 hover:border-cyan-500/30'} border transition-all cursor-pointer`}>
                <p className={`text-sm ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>{result}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DraggablePanel>
  );
}
