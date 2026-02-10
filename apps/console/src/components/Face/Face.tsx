import type { KielStatus } from '../../types/index';

interface FaceProps {
  status: KielStatus;
}

export default function Face({ status }: FaceProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'listening': return 'text-blue-400';
      case 'thinking': return 'text-yellow-400';
      case 'executing': return 'text-green-400';
      case 'speaking': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative w-96 h-96 ${getStatusColor()} transition-colors duration-300`}>
        {/* Outer circle */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Face circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={status !== 'idle' ? 'animate-pulse' : ''}
          />
          
          {/* Eyes */}
          <circle cx="70" cy="80" r="8" fill="currentColor" />
          <circle cx="130" cy="80" r="8" fill="currentColor" />
          
          {/* Mouth - changes based on status */}
          {status === 'idle' && (
            <line x1="70" y1="130" x2="130" y2="130" stroke="currentColor" strokeWidth="2" />
          )}
          {status === 'listening' && (
            <path d="M 70 130 Q 100 140 130 130" fill="none" stroke="currentColor" strokeWidth="2" />
          )}
          {status === 'thinking' && (
            <path d="M 70 130 Q 100 120 130 130" fill="none" stroke="currentColor" strokeWidth="2" />
          )}
          {status === 'executing' && (
            <path d="M 70 130 Q 100 145 130 130" fill="none" stroke="currentColor" strokeWidth="2" />
          )}
          {status === 'speaking' && (
            <ellipse cx="100" cy="130" rx="20" ry="15" fill="none" stroke="currentColor" strokeWidth="2" />
          )}
          
          {/* Status indicator rings */}
          {status !== 'idle' && (
            <>
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
                className="animate-ping"
              />
            </>
          )}
        </svg>
      </div>
      
      <div className="mt-4 text-center">
        <p className={`text-lg font-semibold ${getStatusColor()}`}>
          {status.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
