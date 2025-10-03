import React, { memo, Suspense } from "react";
import Empty from "../../assets/icons/empty.svg?react";
import IconErrorBoundary from "./error";

const Icon = memo(({ name, ...props }) => {
  if (!name) {
    return <Empty {...props} />;
  }

  const Loaded = React.lazy(() =>
    import(`../../assets/icons/${name}.svg?react`)
  );

  return (
    <IconErrorBoundary fallback={<Empty {...props} />}>
      <Suspense
        fallback={
          <span className="w-6 h-6 animate-pulse bg-gray-200 rounded-full" />
        }
      >
        <Loaded {...props} />
      </Suspense>
    </IconErrorBoundary>
  );
});

export default Icon;
