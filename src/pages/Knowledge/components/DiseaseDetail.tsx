import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Disease } from '../../../types';

interface DiseaseDetailProps {
  disease: Disease;
  onClose: () => void;
}

export default function DiseaseDetail({ disease, onClose }: DiseaseDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative h-64">
        <img
          src={disease.imageUrl}
          alt={disease.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{disease.name}</h2>
        <p className="text-gray-600 mb-6">{disease.description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="flex items-center text-red-600 font-semibold mb-3">
              <AlertTriangle className="w-5 h-5 mr-2" />
              症状特征
            </h3>
            <ul className="space-y-2">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center text-green-600 font-semibold mb-3">
              <CheckCircle className="w-5 h-5 mr-2" />
              防治方法
            </h3>
            <ul className="space-y-2">
              {disease.treatments.map((treatment, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="flex items-center text-blue-600 font-semibold mb-3">
            <Info className="w-5 h-5 mr-2" />
            季节性建议
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(disease.seasonalAdvice).map(([season, advice]) => (
              <div key={season} className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 capitalize">
                  {season === 'spring' ? '春季' :
                   season === 'summer' ? '夏季' :
                   season === 'autumn' ? '秋季' : '冬季'}
                </h4>
                <p className="text-sm text-blue-800">{advice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}