import { forwardRef } from "react";

const Empty = forwardRef(function (props, ref) {
  return (
    <div>
      <p>No content</p>
    </div>
  );
});

export default Empty;
