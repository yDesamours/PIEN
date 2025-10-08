export default function CardBody({ children }) {
  return (
    <div className="flex-1 pt-4 flex flex-col justify-end my-2 gap-2">
      {children}
    </div>
  );
}
