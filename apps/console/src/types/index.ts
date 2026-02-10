export type KielStatus = 'idle' | 'listening' | 'thinking' | 'executing' | 'speaking';

export interface Activity {
  id: string;
  timestamp: Date;
  type: 'command' | 'response' | 'action' | 'error';
  message: string;
  status?: KielStatus;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
