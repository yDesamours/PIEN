export default function User({ className }) {
  return (
    <div
      className={`${className} whitespace-nowrap overflow-hidden text-ellipsis`}
    >
      <p className="font-bold">Jerome Neullis</p>
      <p className="text-gray-500">role</p>
    </div>
  );
}
