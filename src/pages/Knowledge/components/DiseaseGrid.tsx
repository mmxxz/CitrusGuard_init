import { Disease } from '../../../types';

interface DiseaseGridProps {
  diseases: Disease[];
  onSelect: (diseaseId: string) => void;
}

export default function DiseaseGrid({ diseases, onSelect }: DiseaseGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {diseases.map(disease => (
        <div
          key={disease.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4"
          onClick={() => onSelect(disease.id)}
        >
          <img
            src={disease.imageUrl}
            alt={disease.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">{disease.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {disease.description}
          </p>
          <div className="mt-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full
              ${disease.category === 'diseases' ? 'bg-red-100 text-red-700' :
                disease.category === 'pests' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'}`}
            >
              {disease.category === 'diseases' ? '病害' :
               disease.category === 'pests' ? '虫害' : '营养'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}