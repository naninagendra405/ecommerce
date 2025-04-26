interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300',
};

export const StatsCard = ({ title, value, subtitle, icon, color }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]} mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
