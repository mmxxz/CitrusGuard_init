export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  imageUrl: string;
  seasonalAdvice: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  preventiveMeasures: string[];
}

export interface DetectionResult {
  disease: Disease;
  confidence: number;
  timestamp: string;
  imageUrl: string;
  location?: string;
  weather?: {
    temperature: number;
    humidity: number;
    season: string;
  };
}

export interface HistoryEntry extends DetectionResult {
  id: string;
  notes?: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  imageUrl?: string;
  timestamp: string;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  timestamp: string;
  answer?: string;
}</content>