import { Message } from '../../types';
import { User, Bot } from 'lucide-react';

interface MessageThreadProps {
  messages: Message[];
}

export default function MessageThread({ messages }: MessageThreadProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center
              ${message.type === 'user' 
                ? 'bg-gray-100' 
                : 'bg-green-100'}`}
            >
              {message.type === 'user' ? (
                <User className="w-5 h-5 text-gray-600" />
              ) : (
                <Bot className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className={`rounded-2xl px-4 py-2 inline-block
              ${message.type === 'user'
                ? 'bg-gray-100 rounded-tl-none'
                : 'bg-green-50 rounded-tl-none'}`}
            >
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Uploaded content"
                  className="max-w-sm rounded-lg mb-2"
                />
              )}
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}