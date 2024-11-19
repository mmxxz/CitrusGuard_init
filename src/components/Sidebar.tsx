import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  BookOpen, 
  History, 
  Bell, 
  Settings, 
  HelpCircle,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Camera, label: '病害检测', path: '/' },
    { icon: MessageCircle, label: '多模态交互', path: '/multimodal' },
    { icon: BookOpen, label: '知识库', path: '/knowledge-base' },
    { icon: History, label: '历史记录', path: '/history' },
    { icon: Bell, label: '提醒', path: '/alerts' },
    { icon: Settings, label: '设置', path: '/settings' },
    { icon: HelpCircle, label: '帮助', path: '/help' },
  ];

  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-10
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-64'}`}
    >
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${location.pathname === item.path
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}