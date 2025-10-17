import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof gsap === "undefined") {
      console.error("GSAP library not loaded. Cursor tracking disabled.");

      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      console.error("Custom cursor element not found.");
      return;
    }

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    let xTo = 0;
    let yTo = 0;
    let x = 0;
    let y = 0;

    const speed = 0.15;
    const halfSize = 12;

    const handleMouseMove = (e) => {
      xTo = e.clientX;
      yTo = e.clientY;
    };

    const updateCursor = () => {
      x += (xTo - x) * speed;
      y += (yTo - y) * speed;

      xSet(x - halfSize);
      ySet(y - halfSize);
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updateCursor);
    };
  }, []);

  return <div ref={cursorRef} id="custom-cursor" aria-hidden="true"></div>;
}
