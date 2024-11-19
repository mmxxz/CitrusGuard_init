import { Bell, Calendar, CheckCircle } from 'lucide-react';
import { notifications } from '../../../data/notifications';

interface NotificationListProps {
  filter: 'all' | 'unread';
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationList({ filter, onMarkAsRead, onMarkAllAsRead }: NotificationListProps) {
  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  return (
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
            <button 
              className="flex items-center text-green-600 hover:text-green-700"
              onClick={() => onMarkAsRead(notification.id)}
            >
              <CheckCircle className="w-5 h-5 mr-1" />
              标记为已读
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}