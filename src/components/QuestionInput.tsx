import { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { Question } from '../types';

interface QuestionInputProps {
  imageUrl: string;
  onQuestionSubmit: (question: Question) => void;
  isLoading?: boolean;
}

export default function QuestionInput({ imageUrl, onQuestionSubmit, isLoading = false }: QuestionInputProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: question.trim(),
      imageUrl,
      timestamp: new Date().toISOString()
    };

    onQuestionSubmit(newQuestion);
    setQuestion('');
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>AI 助手已准备就绪，随时为您解答问题</span>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="询问症状、防治方法或预防措施..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors flex items-center
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}