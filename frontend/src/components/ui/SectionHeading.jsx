export default function SectionHeading({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-emerald/10">
            <Icon size={20} className="text-emerald" strokeWidth={1.8} />
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-coal">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
