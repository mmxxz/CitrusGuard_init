export interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  status: 'active' | 'pending' | 'completed';
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: 'warning',
    title: '检测到新的病害风险',
    description: '天气条件有利于柑橘溃疡病的发展，建议及时采取预防措施。',
    date: '10分钟前',
    isRead: false,
    status: 'active'
  },
  {
    id: 2,
    type: 'info',
    title: '预防性喷药提醒',
    description: '根据当前生长阶段，建议进行预防性杀菌剂喷施。',
    date: '1小时前',
    isRead: false,
    status: 'pending'
  },
  {
    id: 3,
    type: 'success',
    title: '最新检测报告已生成',
    description: '您的柑橘园最新健康检测报告已生成，点击查看详情。',
    date: '2小时前',
    isRead: true,
    status: 'completed'
  },
  {
    id: 4,
    type: 'warning',
    title: '高温预警',
    description: '未来三天预计气温超过35℃，请注意防暑降温。',
    date: '3小时前',
    isRead: false,
    status: 'active'
  },
  {
    id: 5,
    type: 'info',
    title: '营养缺乏预警',
    description: '监测到部分区域存在锌元素缺乏迹象，建议及时补充。',
    date: '4小时前',
    isRead: true,
    status: 'pending'
  }
];