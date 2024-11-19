import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export default function ImagePreview({ imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative inline-block">
      <img 
        src={imageUrl} 
        alt="Preview" 
        className="h-32 rounded-lg object-cover"
      />
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}