export default function CardFooter({ children, className }) {
  return (
    <div className={`flex flex-col justify-end ${className}`}>{children}</div>
  );
}
