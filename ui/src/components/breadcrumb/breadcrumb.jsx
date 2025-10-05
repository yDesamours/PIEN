import { useLocation } from "react-router-dom";

export default function BreadCrumb({ className }) {
  const { pathname } = useLocation();

  const breadcrumb = pathname
    .substring(1)
    .split("/")
    .slice(1)
    .map((e) =>
      e.substring(0, 1).toUpperCase().concat(e.substring(1).toLocaleLowerCase())
    )
    .map((e, i, t) => (
      <span className={i + 1 === t.length ? "font-bold" : ""}>{e}</span>
    ));

  return <div className={`${className} text-xs `}>{breadcrumb}</div>;
}
