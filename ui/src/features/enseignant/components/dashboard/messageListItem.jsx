export default function MessageListItem({
  name,
  messagePreview,
  timeAgo,
  avatarSrc,
}) {
  return (
    <li className="flex items-center space-x-4 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition duration-150 ease-in-out">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
          {name.charAt(0)}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-600 truncate">{messagePreview}</p>
          <span className="text-xs text-gray-400 font-light">•</span>
          <p className="text-xs text-gray-500 font-light flex-shrink-0">
            {timeAgo}
          </p>
        </div>
      </div>
    </li>
  );
}
