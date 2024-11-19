import { useState, useEffect } from 'react';
import { Bot, Image as ImageIcon, Send, X, Loader, MessageCircle, HelpCircle } from 'lucide-react';
import MessageThread from './MessageThread';
import ImagePreview from './ImagePreview';
import { Message } from '../../types';

export default function MultimodalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // 添加欢迎消息
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'assistant',
          text: '欢迎使用多模态交互功能！我可以帮您：\n\n1. 分析病害图片\n2. 回答专业问题\n3. 提供防治建议\n\n您可以上传图片并描述症状，或直接询问相关问题。',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
      setShowGuide(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imagePreview) || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input.trim(),
      imageUrl: imagePreview || undefined,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setShowGuide(false);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        text: generateResponse(input, imagePreview),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
      setImagePreview(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold">多模态交互</h2>
            <p className="text-sm text-gray-500">上传图片并提问，获取专业建议</p>
          </div>
        </div>
        
        {showGuide && (
          <button 
            onClick={() => setShowGuide(false)}
            className="text-sm text-green-600 hover:text-green-700 flex items-center"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            关闭引导
          </button>
        )}
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageThread messages={messages} />
        
        {showGuide && (
          <div className="mt-4 bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">使用提示</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                点击左下角图标上传病害图片
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                描述您观察到的症状
              </li>
              <li className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                发送后等待 AI 分析和建议
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 pb-4">
          <ImagePreview 
            imageUrl={imagePreview} 
            onRemove={() => setImagePreview(null)} 
          />
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
              placeholder="描述症状或上传图片..."
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
    return `根据您提供的图片，我观察到以下特征：
1. 叶片边缘出现黄化现象
2. 叶面有不规则斑点
3. 部分叶片卷曲

建议您：
1. 注意控制浇水量，避免过度浇水
2. 适当增加通风，减少湿度
3. 可以考虑使用铜制杀菌剂进行预防性喷施

需要更详细的建议吗？`;
  }

  const lowerText = text.toLowerCase();
  if (lowerText.includes('黄化') || lowerText.includes('发黄')) {
    return '叶片发黄可能有多种原因：营养缺乏（特别是氮、铁、锌）、病虫害、浇水问题等。建议您上传一张清晰的图片，我可以帮您进行更准确的诊断。';
  }
  
  if (lowerText.includes('病虫害') || lowerText.includes('虫子')) {
    return '要准确判断病虫害类型，最好能提供以下信息：\n1. 受害部位的清晰图片\n2. 症状出现的时间和发展过程\n3. 目前的管理措施\n您可以上传相关图片，我会为您进行分析。';
  }

  return '您可以描述观察到的症状，或上传植株照片，我会帮您诊断问题并提供针对性的建议。';
}