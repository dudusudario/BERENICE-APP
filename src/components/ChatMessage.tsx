import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ChatMessageProps {
  content: string;
  created_at: string;
  user_id: string;
  isCurrentUser: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  created_at,
  isCurrentUser,
  status = 'sent'
}) => {
  const messageTime = format(new Date(created_at), "d 'de' MMMM 'às' HH:mm", { locale: ptBR });

  const renderStatus = () => {
    if (!isCurrentUser) return null;
    
    switch (status) {
      case 'sent':
        return <CheckIcon className="h-4 w-4 text-blue-100" />;
      case 'delivered':
        return (
          <div className="flex">
            <CheckIcon className="h-4 w-4 text-blue-100" />
            <CheckIcon className="h-4 w-4 text-blue-100 -ml-2" />
          </div>
        );
      case 'read':
        return <CheckCircleIcon className="h-4 w-4 text-blue-100" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      } mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isCurrentUser
            ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors'
        }`}
      >
        <p className="text-sm break-words">{content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          {renderStatus()}
          <span className={`text-xs ${
            isCurrentUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {messageTime}
          </span>
        </div>
      </div>
    </div>
  );
}; 