const bgColors = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  gray: "bg-gray-500",
  black: "bg-black",
  white: "bg-white",
};

const borderColors = {
  blue: "border-blue-500",
  red: "border-red-500",
  green: "border-green-500",
  yellow: "border-yellow-500",
  purple: "border-purple-500",
  pink: "border-pink-500",
  indigo: "border-indigo-500",
  gray: "border-gray-500",
  black: "border-black",
  white: "border-white",
};

const textColors = {
  blue: "text-blue-500",
  red: "text-red-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  indigo: "text-indigo-500",
  gray: "text-gray-500",
  black: "text-black",
  white: "text-white",
};

export default function Button({
  color = "blue",
  outline = false,
  children,
  onClick = () => {},
}) {
  const className = `${
    outline
      ? "bg-transparent border-2  " +
        borderColors[color] +
        " " +
        textColors[color]
      : bgColors[color] + " text-white"
  } px-4 py-2 rounded-sm  cursor-pointer m-1 flex justify-center`;

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
