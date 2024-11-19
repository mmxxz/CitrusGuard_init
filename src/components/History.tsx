import { useState, useMemo } from 'react';
import { Calendar, Search, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HistoryEntry } from '../types';
import DiseaseCard from './DiseaseCard';
import { diseases } from '../data/diseases';

export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'confidence'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock history data with more entries
  const historyEntries: HistoryEntry[] = [
    {
      id: '1',
      disease: diseases[0], // Citrus Canker
      confidence: 92,
      timestamp: '2024-03-15T10:30:00Z',
      imageUrl: diseases[0].imageUrl,
      notes: 'Found in the east section of the grove',
      location: 'East Grove - Block A',
      weather: {
        temperature: 25,
        humidity: 70,
        season: 'spring'
      }
    },
    {
      id: '2',
      disease: diseases[1], // HLB
      confidence: 88,
      timestamp: '2024-03-14T15:45:00Z',
      imageUrl: diseases[1].imageUrl,
      notes: 'Multiple trees showing symptoms',
      location: 'West Grove - Block C',
      weather: {
        temperature: 28,
        humidity: 65,
        season: 'spring'
      }
    },
    {
      id: '3',
      disease: diseases[2], // Scab
      confidence: 95,
      timestamp: '2024-03-13T09:15:00Z',
      imageUrl: diseases[2].imageUrl,
      location: 'South Grove - Block B',
      weather: {
        temperature: 23,
        humidity: 75,
        season: 'spring'
      }
    },
    {
      id: '4',
      disease: diseases[3], // Aphids
      confidence: 78,
      timestamp: '2024-03-12T14:20:00Z',
      imageUrl: diseases[3].imageUrl,
      notes: 'Early stage infestation detected',
      location: 'North Grove - Block D',
      weather: {
        temperature: 26,
        humidity: 68,
        season: 'spring'
      }
    },
    {
      id: '5',
      disease: diseases[4], // Citrus Rust Mites
      confidence: 85,
      timestamp: '2024-03-11T11:10:00Z',
      imageUrl: diseases[4].imageUrl,
      location: 'Central Grove - Block E',
      weather: {
        temperature: 27,
        humidity: 72,
        season: 'spring'
      }
    }
  ];

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

  const handleLearnMore = (diseaseId: string) => {
    navigate('/knowledge-base', { state: { selectedDisease: diseaseId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detection History</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by disease, location, or notes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Results</option>
            <option value="high">High Confidence (≥90%)</option>
            <option value="low">Low Confidence (&lt;90%)</option>
          </select>

          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'confidence')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="confidence">Sort by Confidence</option>
            </select>
            
            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowUpDown className={`w-5 h-5 ${sortOrder === 'asc' ? 'text-green-600' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEntries.map((entry) => (
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
                    {entry.weather.temperature}°C, {entry.weather.humidity}% Humidity
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