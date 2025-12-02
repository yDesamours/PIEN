function ProgressBar({ progress, course }) {
  let colorClass = "bg-green-500"; // Default
  if (course.includes("React")) {
    colorClass = "bg-blue-600";
  } else if (course.includes("Python")) {
    colorClass = "bg-purple-600";
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${colorClass}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default function StudentActivityRow({
  name,
  email,
  avatarSrc,
  classe,
  activity,
  progress,
  lastActive,
  action,
  actionStyle,
  isGraded,
}) {
  return (
    <tr>
      {/* Student */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {/* Placeholder d'avatar - Remplacer 'src' par avatarSrc si vous avez de vraies images */}
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={avatarSrc || "https://via.placeholder.com/40"}
              alt={`${name} avatar`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>

      {/* Course */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {classe}
      </td>

      {/* Activity */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {activity}
      </td>

      {/* Last Active */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {lastActive}
      </td>
    </tr>
  );
}
