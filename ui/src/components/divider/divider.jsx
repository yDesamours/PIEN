export default function Divider({
  orientation = "horizontal",
  className = "",
}) {
  if (orientation === "vertical") {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-px bg-gray-300 h-full" />
      </div>
    );
  }

  // horizontal
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
}
