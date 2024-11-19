import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export default function CategoryList({ categories, selectedCategory, onSelect }: CategoryListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold text-lg mb-4">分类</h2>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors
              ${selectedCategory === category.id
                ? 'bg-green-50 text-green-700'
                : 'hover:bg-gray-50 text-gray-600'}`}
          >
            <div className="flex items-center space-x-3">
              <category.icon className={`w-5 h-5 ${
                selectedCategory === category.id ? 'text-green-600' : 'text-gray-400'
              }`} />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm ${
              selectedCategory === category.id ? 'text-green-600' : 'text-gray-500'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}