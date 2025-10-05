export default function StatCard({
  title,
  value,
  description,
  icon,
  iconBgClass,
}) {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg min-w-[220px]">
      <div
        className={`flex justify-center items-center w-12 h-12 rounded-xl text-white text-2xl mb-4 ${iconBgClass}`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <div className="text-gray-500 font-medium text-base">{title}</div>
        <div className="text-4xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600 mt-2">{description}</div>
      </div>
    </div>
  );
}
