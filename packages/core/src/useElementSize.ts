import { useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

function useElementSize(ref: React.MutableRefObject<HTMLElement | null>) {
  let [size, setSize] = useState<Size | null>(ref.current ? getSize(ref.current) : null);

  function updateSize() {
    if (ref.current) {
      setSize(getSize(ref.current));
    }
  }

  useEffect(() => {
    const observer = new ResizeObserver(updateSize);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref.current]);

  return size;
}

function getSize(el: HTMLElement) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

export default useElementSize;
