import { useState, useMemo } from 'react';
import { HistoryList } from './components';
import { diseases } from '../../data/diseases';
import { HistoryEntry } from '../../types';

// Mock history data
const historyEntries: HistoryEntry[] = [
  {
    id: '1',
    disease: diseases[0],
    confidence: 92,
    timestamp: '2024-03-15T10:30:00Z',
    imageUrl: diseases[0].imageUrl,
    notes: '在果园东区发现',
    location: '东区 - A区块',
    weather: {
      temperature: 25,
      humidity: 70,
      season: 'spring'
    }
  },
  {
    id: '2',
    disease: diseases[1],
    confidence: 88,
    timestamp: '2024-03-14T15:45:00Z',
    imageUrl: diseases[1].imageUrl,
    notes: '多棵树木出现症状',
    location: '西区 - C区块',
    weather: {
      temperature: 28,
      humidity: 65,
      season: 'spring'
    }
  },
  {
    id: '3',
    disease: diseases[2],
    confidence: 95,
    timestamp: '2024-03-13T09:15:00Z',
    imageUrl: diseases[2].imageUrl,
    location: '南区 - B区块',
    weather: {
      temperature: 23,
      humidity: 75,
      season: 'spring'
    }
  },
  {
    id: '4',
    disease: diseases[3],
    confidence: 78,
    timestamp: '2024-03-12T14:20:00Z',
    imageUrl: diseases[3].imageUrl,
    notes: '发现早期虫害迹象',
    location: '北区 - D区块',
    weather: {
      temperature: 26,
      humidity: 68,
      season: 'spring'
    }
  },
  {
    id: '5',
    disease: diseases[4],
    confidence: 85,
    timestamp: '2024-03-11T11:10:00Z',
    imageUrl: diseases[4].imageUrl,
    location: '中区 - E区块',
    weather: {
      temperature: 27,
      humidity: 72,
      season: 'spring'
    }
  }
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'confidence'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = historyEntries.filter(entry => {
      const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
        entry.disease.name.toLowerCase().includes(term) ||
        entry.disease.description.toLowerCase().includes(term) ||
        entry.location?.toLowerCase().includes(term) ||
        entry.notes?.toLowerCase().includes(term)
      );

      const matchesFilter = filter === 'all' ||
        (filter === 'high' && entry.confidence >= 90) ||
        (filter === 'low' && entry.confidence < 90);

      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.confidence - a.confidence
          : a.confidence - b.confidence;
      }
    });
  }, [searchQuery, filter, sortBy, sortOrder]);

  return (
    <HistoryList
      entries={filteredAndSortedEntries}
      searchQuery={searchQuery}
      filter={filter}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSearchChange={setSearchQuery}
      onFilterChange={setFilter}
      onSortChange={setSortBy}
      onSortOrderChange={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
    />
  );
}