import { AlertTriangle, CheckCircle, ThermometerSun, Droplets } from 'lucide-react';
import { DetectionResult } from '../../../types';

interface ResultViewProps {
  result: DetectionResult;
}

export default function ResultView({ result }: ResultViewProps) {
  const { disease, confidence, weather } = result;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{disease.name}</h2>
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {confidence}% 匹配度
          </span>
        </div>

        <p className="text-gray-600 mb-6">{disease.description}</p>

        {weather && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">环境因素</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <ThermometerSun className="w-5 h-5 text-blue-500 mr-2" />
                <span>{weather.temperature}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                <span>{weather.humidity}% 湿度</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center text-red-600 font-semibold mb-2">
              <AlertTriangle className="w-5 h-5 mr-2" />
              症状特征
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {disease.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center text-green-600 font-semibold mb-2">
              <CheckCircle className="w-5 h-5 mr-2" />
              防治建议
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {disease.treatments.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
          </div>

          {weather && (
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                季节性建议 ({weather.season === 'spring' ? '春季' :
                           weather.season === 'summer' ? '夏季' :
                           weather.season === 'autumn' ? '秋季' : '冬季'})
              </h3>
              <p className="text-amber-800">
                {disease.seasonalAdvice[weather.season as keyof typeof disease.seasonalAdvice]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}