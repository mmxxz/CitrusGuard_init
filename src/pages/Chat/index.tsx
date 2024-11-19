import { useState } from 'react';
import { Bot, Image as ImageIcon, Send, X, Loader } from 'lucide-react';
import { ChatThread } from './components';
import { Question } from '../../types';
import { diseases } from '../../data/diseases';

export default function ChatPage() {
  const [messages, setMessages] = useState<Question[]>([]);
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imagePreview) || isLoading) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: input.trim(),
      imageUrl: imagePreview || undefined,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newQuestion]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => prev.map(q => 
          q.id === newQuestion.id
            ? {
                ...q,
                answer: generateResponse(q.text, imagePreview)
              }
            : q
        ));
        setIsLoading(false);
        if (imagePreview) setImagePreview(null);
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <Bot className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="font-semibold">CitrusGuard AI 助手</h2>
          <p className="text-sm text-gray-500">随时为您解答柑橘病害相关问题</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatThread questions={messages} />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 pb-4">
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-32 rounded-lg object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <label className="flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg cursor-pointer transition-colors">
              <ImageIcon className="w-6 h-6" />
            </div>
          </label>

          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="询问柑橘病害相关问题，或上传图片..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !imagePreview)}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center
              ${(!input.trim() && !imagePreview) || isLoading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function generateResponse(text: string, hasImage: string | null): string {
  if (hasImage) {
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    return `根据您提供的图片，这看起来是${disease.name}。${disease.description}。您想了解更多关于症状或防治方法吗？`;
  }

  const lowerText = text.toLowerCase();
  if (lowerText.includes('症状')) {
    return '常见的柑橘病害症状包括叶片发黄、果实斑点、果实早落和枝条枯死。需要我分析具体图片吗？';
  }
  
  if (lowerText.includes('治疗') || lowerText.includes('防治')) {
    return '防治方法通常包括适当修剪、使用杀菌剂和改善栽培措施。如果您能提供病害图片，我可以给出更具体的建议。';
  }

  return '我可以帮您识别和处理柑橘病害。您可以上传图片或询问具体的症状和防治方法。';
}