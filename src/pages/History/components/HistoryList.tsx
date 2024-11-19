import { useState } from 'react';
import { Calendar, Search, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HistoryEntry } from '../../../types';
import DiseaseCard from './DiseaseCard';

interface HistoryListProps {
  entries: HistoryEntry[];
  searchQuery: string;
  filter: string;
  sortBy: 'date' | 'confidence';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: 'date' | 'confidence') => void;
  onSortOrderChange: () => void;
}

export default function HistoryList({
  entries,
  searchQuery,
  filter,
  sortBy,
  sortOrder,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onSortOrderChange
}: HistoryListProps) {
  const navigate = useNavigate();

  const handleLearnMore = (diseaseId: string) => {
    navigate('/knowledge-base', { state: { selectedDisease: diseaseId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">检测历史</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索病害、位置或备注..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">全部结果</option>
            <option value="high">高置信度 (≥90%)</option>
            <option value="low">低置信度 (&lt;90%)</option>
          </select>

          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'date' | 'confidence')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">按日期排序</option>
              <option value="confidence">按置信度排序</option>
            </select>
            
            <button
              onClick={onSortOrderChange}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowUpDown className={`w-5 h-5 ${sortOrder === 'asc' ? 'text-green-600' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">未找到结果</h3>
          <p className="text-gray-600">
            尝试调整搜索条件或筛选条件
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-sm p-4">
              <DiseaseCard 
                disease={entry.disease} 
                confidence={entry.confidence}
                onLearnMore={() => handleLearnMore(entry.disease.id)}
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </div>
                  {entry.location && (
                    <span className="text-gray-500">{entry.location}</span>
                  )}
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {entry.notes}
                  </p>
                )}
                {entry.weather && (
                  <div className="text-sm text-gray-500">
                    {entry.weather.temperature}°C, {entry.weather.humidity}% 湿度
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}