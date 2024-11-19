import { Clock } from 'lucide-react';
import { diseases } from '../data/diseases';
import { useNavigate } from 'react-router-dom';

export default function RecentDetections() {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/history');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">最近检测</h2>
        <button 
          onClick={handleViewAll}
          className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors flex items-center"
        >
          查看全部
        </button>
      </div>
      
      <div className="space-y-4">
        {diseases.slice(0, 3).map((disease, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img
              src={disease.imageUrl}
              alt={disease.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {disease.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {index === 0 ? '2小时前' : 
                 index === 1 ? '4小时前' : 
                 '6小时前'}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {index === 0 ? '92%' : 
               index === 1 ? '88%' : 
               '85%'} 匹配度
            </span>
          </div>
        ))}

        <button
          onClick={handleViewAll} 
          className="w-full py-2 text-sm text-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          查看更多 {diseases.length - 3} 条检测记录
        </button>
      </div>
    </div>
  );
}