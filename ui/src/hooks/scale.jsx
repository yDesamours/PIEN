import { useCallback, useState } from "react";

export default function useScale() {
  const [scale, setScale] = useState(100);
  const zoomInOrOut = useCallback((e) => {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();
    const delta = e.deltaY < 0 ? 10 : -10;
    setScale((oldScale) => {
      const newScale = oldScale + delta;
      if (newScale < 50 || newScale > 150) return oldScale;
      return newScale;
    });
  }, []);

  return [scale, zoomInOrOut];
}
