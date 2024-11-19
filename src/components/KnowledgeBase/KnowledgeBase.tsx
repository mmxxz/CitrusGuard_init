import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Book, AlertTriangle, Leaf, Bug, Microscope } from 'lucide-react';
import SearchBar from './SearchBar';
import CategoryList from './CategoryList';
import DiseaseDetail from './DiseaseDetail';
import { diseases } from '../../data/diseases';

export default function KnowledgeBase() {
  const location = useLocation();
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle disease selection from history page
  useEffect(() => {
    if (location.state?.selectedDisease) {
      setSelectedDisease(location.state.selectedDisease);
    }
  }, [location.state]);

  const categories = [
    { id: 'all', name: '全部', icon: Book, count: diseases.length },
    { id: 'diseases', name: '病害', icon: Microscope, count: diseases.filter(d => d.category === 'diseases').length },
    { id: 'pests', name: '虫害', icon: Bug, count: diseases.filter(d => d.category === 'pests').length },
    { id: 'nutrition', name: '营养', icon: Leaf, count: diseases.filter(d => d.category === 'nutrition').length }
  ];

  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => {
      const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
        disease.name.toLowerCase().includes(term) ||
        disease.description.toLowerCase().includes(term) ||
        disease.symptoms.some(s => s.toLowerCase().includes(term)) ||
        disease.treatments.some(t => t.toLowerCase().includes(term))
      );

      const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">柑橘病虫害知识库</h1>
          </div>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CategoryList 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedDisease ? (
              <DiseaseDetail 
                disease={diseases.find(d => d.id === selectedDisease)!}
                onClose={() => setSelectedDisease(null)}
              />
            ) : (
              <>
                {filteredDiseases.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">未找到相关结果</h3>
                    <p className="text-gray-600">
                      尝试使用不同的搜索词或选择其他分类
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDiseases.map(disease => (
                      <div
                        key={disease.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4"
                        onClick={() => setSelectedDisease(disease.id)}
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}