import React, { Suspense } from "react";

export default function Icon({ name, ...props }) {
  const Loaded = React.lazy(() =>
    import(`../../assets/icons/${name}.svg?react`)
  );

  return (
    <Suspense fallback={<span className="w-6 h-6 inline-block" />}>
      <Loaded {...props} />
    </Suspense>
  );
}
