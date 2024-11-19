import { Disease } from '../types';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface DiseaseCardProps {
  disease: Disease;
  confidence?: number;
  onLearnMore?: () => void;
}

export default function DiseaseCard({ disease, confidence, onLearnMore }: DiseaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img 
          src={disease.imageUrl} 
          alt={disease.name}
          className="w-full h-full object-cover"
        />
        {confidence && (
          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium
            ${confidence >= 90 
              ? 'bg-green-100 text-green-800' 
              : confidence >= 80 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'}`}
          >
            {confidence}% Match
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{disease.name}</h3>
        <p className="text-gray-600 mb-4">{disease.description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="flex items-center text-red-600 font-medium mb-2">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Symptoms
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {disease.symptoms.slice(0, 2).map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
              {disease.symptoms.length > 2 && (
                <li className="text-gray-500">
                  +{disease.symptoms.length - 2} more symptoms...
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="flex items-center text-green-600 font-medium mb-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Treatments
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {disease.treatments.slice(0, 2).map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
              {disease.treatments.length > 2 && (
                <li className="text-gray-500">
                  +{disease.treatments.length - 2} more treatments...
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <button 
          onClick={onLearnMore}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
        >
          <Info className="w-4 h-4 mr-2" />
          Learn More
        </button>
      </div>
    </div>
  );
}