interface StatItem {
  label: string;
  value: number;
}

interface StatCardProps {
  title: string;
  stats: StatItem[];
}

export default function StatCard({ title, stats }: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{stat.label}:</span>
            <span className="text-2xl font-bold text-indigo-600">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
