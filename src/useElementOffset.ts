import { useLayoutEffect, useState } from "react";

type Offset = {
  x: number;
  y: number;
};

function useElementOffset(ref: React.MutableRefObject<HTMLElement | null>) {
  let [offset, setOffset] = useState<Offset | null>(
    ref.current ? getOffset(ref.current) : null
  );

  function handleResize() {
    if (ref.current) {
      setOffset(getOffset(ref.current));
    }
  }

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return offset;
}

function getOffset(el: HTMLElement) {
  const { left: x, top: y } = el.getBoundingClientRect();

  return {
    x,
    y,
  };
}

export default useElementOffset;
