import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';

interface DraggablePanelProps {
  children: ReactNode;
  id: string;
  onClose?: () => void;
}

export default function DraggablePanel({ children, id, onClose }: DraggablePanelProps) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(`panel-${id}`);
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem(`panel-${id}`, JSON.stringify(position));
  }, [position, id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 border border-red-400 flex items-center justify-center text-white text-xs transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        >
          ✕
        </button>
      )}
    </div>
  );
}
