import { useLayoutEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

function useElementSize(ref: React.MutableRefObject<HTMLElement | null>) {
  let [size, setSize] = useState<Size | null>(ref.current ? getSize(ref.current) : null);

  function handleResize() {
    if (ref.current) {
      setSize(getSize(ref.current));
    }
  }

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

function getSize(el: HTMLElement) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

export default useElementSize;
