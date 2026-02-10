import type { Activity } from '../../types/index';

interface ActivityLogProps {
  activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'command': return '›';
      case 'response': return '‹';
      case 'action': return '⚡';
      case 'error': return '✕';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'command': return 'text-blue-400';
      case 'response': return 'text-green-400';
      case 'action': return 'text-yellow-400';
      case 'error': return 'text-red-400';
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">ACTIVITY LOG</h3>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">No activity yet...</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-2 text-sm">
              <span className={`${getActivityColor(activity.type)} font-bold`}>
                {getActivityIcon(activity.type)}
              </span>
              <div className="flex-1">
                <p className="text-gray-300">{activity.message}</p>
                <span className="text-gray-600 text-xs">
                  {activity.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
