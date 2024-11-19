import { Question } from '../../../types';
import { User, Bot } from 'lucide-react';

interface ChatThreadProps {
  questions: Question[];
}

export default function ChatThread({ questions }: ChatThreadProps) {
  return (
    <div className="mt-6 space-y-6">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 inline-block">
                <p className="text-gray-800">{question.text}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {new Date(question.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {question.answer && (
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-green-50 rounded-2xl rounded-tl-none px-4 py-2 inline-block">
                  <p className="text-gray-800 prose prose-sm">
                    {question.answer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}