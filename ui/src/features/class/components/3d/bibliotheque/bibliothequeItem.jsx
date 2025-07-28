export default function BibliothequeItem({
  img,
  name,
  description,
  onChoose,
  path,
}) {
  return (
    <figure
      onClick={() => onChoose({ name, path })}
      className="w-32 hover:scale-110 duration-300 transition-all "
    >
      <img src={img} alt={name} className="w-full h-auto" />
      <figcaption>{description}</figcaption>
    </figure>
  );
}
