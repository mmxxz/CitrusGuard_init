import { useState, useRef } from 'react';
import { Upload, AlertCircle, Loader } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUpload({ onUpload, isAnalyzing }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFiles(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFiles(files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg transition-colors cursor-pointer
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}
          ${preview ? 'border-none p-0' : 'p-8'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader className="w-12 h-12 text-green-500 animate-spin mb-4" />
            <p className="text-lg font-medium">正在分析图片...</p>
            <p className="text-sm text-gray-500">这可能需要几秒钟时间</p>
          </div>
        ) : preview ? (
          <div className="relative group">
            <img 
              src={preview} 
              alt="预览" 
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <p className="text-white font-medium">点击更换图片</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <p className="text-lg font-medium">点击或拖放图片到这里</p>
              <p className="text-sm text-gray-500 mt-1">支持 JPG、PNG 格式</p>
            </div>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>建议上传清晰的病害部位图片</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}