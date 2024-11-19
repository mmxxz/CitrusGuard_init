import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Book, AlertTriangle, Leaf, Bug, Microscope } from 'lucide-react';
import { SearchBar, CategoryList, DiseaseDetail, DiseaseGrid } from './components';
import { diseases } from '../../data/diseases';

export default function KnowledgePage() {
  const location = useLocation();
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle disease selection from history page
  useState(() => {
    if (location.state?.selectedDisease) {
      setSelectedDisease(location.state.selectedDisease);
    }
  });

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
                  <DiseaseGrid 
                    diseases={filteredDiseases}
                    onSelect={setSelectedDisease}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}