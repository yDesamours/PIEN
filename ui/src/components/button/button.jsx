export default function Button({
  children,
  onClick = () => {},
  className = "",
}) {
  const butonClassName = className.concat(
    "px-4 py-2 rounded-sm  cursor-pointer m-1 flex justify-center"
  );

  return (
    <button onClick={onClick} className={butonClassName}>
      {children}
    </button>
  );
}
