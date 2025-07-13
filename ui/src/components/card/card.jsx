export default function Card({ children, onClick = () => {}, ...props }) {
  return (
    <li
      onClick={onClick}
      className="flex flex-col sm:w-1/2 md:w-1/4 lg:w-1/8 flex-shrink-0 flex-grow-0 bg-white p-4 rounded-lg shadow-md h-70 hover:scale-105 transition-all duration-300"
      {...props}
    >
      {children}
    </li>
  );
}
