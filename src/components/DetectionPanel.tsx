import { useState } from 'react';
import ImageUpload from './ImageUpload';
import ResultView from './ResultView';
import QuestionInput from './QuestionInput';
import ChatThread from './ChatThread';
import RecentDetections from './RecentDetections';
import { DetectionResult, Question } from '../types';
import { diseases } from '../data/diseases';
import { Camera, MessageCircle, AlertTriangle } from 'lucide-react';

export default function DetectionPanel() {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Call API endpoint
      const response = await fetch('/api/detections', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Detection failed');
      }

      const data = await response.json();
      
      // Transform API response to DetectionResult
      const mockResult: DetectionResult = {
        disease: diseases[0], // Replace with actual disease from API
        confidence: data.confidence || 89,
        timestamp: new Date().toISOString(),
        imageUrl: URL.createObjectURL(file),
        weather: {
          temperature: 25,
          humidity: 70,
          season: 'summer'
        }
      };
      
      setResult(mockResult);
    } catch (error) {
      console.error('Error during detection:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuestionSubmit = async (question: Question) => {
    setIsAnswering(true);
    setQuestions(prev => [...prev, question]);

    try {
      // Simulate AI response
      setTimeout(() => {
        setQuestions(prev => prev.map(q => 
          q.id === question.id
            ? {
                ...q,
                answer: generateAnswer(q.text, result?.disease)
              }
            : q
        ));
      }, 1500);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Handle error
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 顶部引导区域 */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <Camera className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          智能病害检测
        </h1>
        <p className="text-lg text-gray-600">
          上传植株照片，获取即时诊断和个性化防治建议
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 主要检测区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 上传区域 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center">
                <Camera className="w-5 h-5 text-green-600 mr-2" />
                图片上传
              </h2>
            </div>
            <div className="p-6">
              <ImageUpload onUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            </div>
          </div>

          {/* AI 对话区域 */}
          {result && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center">
                  <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                  AI 助手
                </h2>
              </div>
              <div className="p-6">
                <QuestionInput 
                  imageUrl={result.imageUrl} 
                  onQuestionSubmit={handleQuestionSubmit}
                  isLoading={isAnswering}
                />
                <ChatThread questions={questions} />
              </div>
            </div>
          )}
          
          {/* 最近检测记录 */}
          {!result && <RecentDetections />}
        </div>

        {/* 右侧区域 */}
        <div className="lg:col-span-1">
          {result ? (
            <ResultView result={result} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center">
                  <AlertTriangle className="w-5 h-5 text-green-600 mr-2" />
                  拍摄建议
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">光线充足</h3>
                      <p className="text-sm text-gray-600">
                        确保拍摄环境光线充足，避免阴影干扰
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">对准病症</h3>
                      <p className="text-sm text-gray-600">
                        将病症部位置于画面中央，确保清晰可见
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">对比拍摄</h3>
                      <p className="text-sm text-gray-600">
                        同时包含健康和受害部位，便于对比分析
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">多角度拍摄</h3>
                      <p className="text-sm text-gray-600">
                        从不同角度拍摄，提供更全面的症状信息
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function generateAnswer(question: string, disease?: Disease): string {
  if (!disease) return "抱歉，我需要更多关于病害的信息才能回答您的问题。";

  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("症状")) {
    return `${disease.name}的主要症状包括：${disease.symptoms.join("、")}。`;
  }
  
  if (lowerQuestion.includes("治疗") || lowerQuestion.includes("防治")) {
    return `对于${disease.name}，建议采取以下防治措施：${disease.treatments.join("、")}。`;
  }
  
  if (lowerQuestion.includes("预防")) {
    return `预防${disease.name}的措施包括：${disease.preventiveMeasures.join("、")}。`;
  }

  return `${disease.name}是${disease.description}。您想了解更多关于症状、防治方法还是预防措施？`;
}