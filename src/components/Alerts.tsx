import { Bell, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { notifications } from '../data/notifications';
import { useState } from 'react';

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">提醒与通知</h1>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">全部通知</option>
            <option value="unread">未读通知</option>
          </select>
          <button className="btn btn-primary flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            全部标记为已读
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-6 border-l-4 
              ${notification.type === 'warning' ? 'border-amber-500' : 
                notification.type === 'info' ? 'border-blue-500' : 
                'border-green-500'}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  {!notification.isRead && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      未读
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{notification.description}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {notification.date}
                </div>
              </div>
              <button className="flex items-center text-green-600 hover:text-green-700">
                <CheckCircle className="w-5 h-5 mr-1" />
                标记为已读
              </button>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无通知</h3>
            <p className="text-gray-600">
              {filter === 'unread' ? '没有未读的通知' : '目前没有任何通知'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}