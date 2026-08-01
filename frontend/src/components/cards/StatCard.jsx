export default function StatCard({ icon: Icon, label, value, change, changeType = 'neutral' }) {
  const changeColors = {
    up: 'text-emerald bg-emerald/10',
    down: 'text-red-500 bg-red-500/10',
    neutral: 'text-gray-500 bg-gray-100',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-coal">{value}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald/10">
          <Icon size={20} className="text-emerald" strokeWidth={1.8} />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${changeColors[changeType]}`}>
            {changeType === 'up' && '+'}
            {change}
          </span>
          <span className="text-xs text-gray-400 ml-2">son 30 gun</span>
        </div>
      )}
    </div>
  )
}
