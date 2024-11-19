import { useState } from 'react';
import { Citrus, Menu, Bell, User, X, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/notifications';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleClickOutside = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/alerts');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-2">
              <Citrus className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-transparent bg-clip-text">
                CitrusGuard
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0" onClick={handleClickOutside}></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">通知</h3>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.slice(0, 3).map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors
                            ${notification.isRead ? 'opacity-70' : ''}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0
                              ${notification.type === 'warning' ? 'bg-amber-500' :
                                notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <button 
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                        onClick={handleViewAllNotifications}
                      >
                        查看全部通知
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">张三</p>
                  <p className="text-xs text-gray-500">柑橘专家</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </button>

              {showProfile && (
                <>
                  <div className="fixed inset-0" onClick={handleClickOutside}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium text-gray-900">张三</p>
                      <p className="text-sm text-gray-500">zhangsan@example.com</p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfile(false);
                          navigate('/settings');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>设置</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfile(false);
                          navigate('/help');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span>帮助与支持</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfile(false);
                          // Handle logout
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>退出登录</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}