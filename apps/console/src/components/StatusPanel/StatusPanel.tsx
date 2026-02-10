import type { KielStatus } from '../../types/index';

interface StatusPanelProps {
  status: KielStatus;
  currentTask?: string;
}

export default function StatusPanel({ status, currentTask }: StatusPanelProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">SYSTEM STATUS</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">State:</span>
          <span className="text-white font-mono text-sm">{status}</span>
        </div>
        
        {currentTask && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Task:</span>
            <span className="text-white font-mono text-sm truncate ml-2">{currentTask}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Core:</span>
          <span className="text-green-400 font-mono text-sm">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
