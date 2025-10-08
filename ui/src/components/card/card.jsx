export default function Card({
  children,
  as: Element = "div",
  onClick = () => {},
  className,
  ...props
}) {
  return (
    <Element
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow-md min-w-60 hover:scale-105 transition-all flex flex-col duration-300 ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
