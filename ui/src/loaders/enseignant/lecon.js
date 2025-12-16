export default async function leconLoader(params) {
  return defer({
    lecon: fetch("/api/cours/lecons/1")
      .then((e) => e.json())
      .then((d) => JSON.parse(d)),
  });
}
