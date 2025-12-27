export default function User({ className,userName,role }) {
  return (
    <div
      className={`${className} whitespace-nowrap overflow-hidden text-ellipsis`}
    >
      <p className="font-bold">{userName}</p>
      <p className="text-gray-500">{role}</p>
    </div>
  );
}
