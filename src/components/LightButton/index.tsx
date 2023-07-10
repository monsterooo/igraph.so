import { useEffect, useRef } from 'react';

export const LightButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: any) => {
    if (!buttonRef.current) return;
    const { x, y }: { x: number, y: number } = e;
    const element: any = document.elementFromPoint(x, y);
    const control = element.closest(".light-button");
    if (control) {
      console.info('doing it')
      const BOUNDS = control.getBoundingClientRect()
      const rx = (x - BOUNDS.x) / BOUNDS.width;
      const cx = (x - BOUNDS.x) / BOUNDS.width;
      const cy = (y - BOUNDS.y) / BOUNDS.height;
      buttonRef.current.style.setProperty("--rx", String(rx));
      buttonRef.current.style.setProperty("--x", String(cx));
      buttonRef.current.style.setProperty("--y", String(cy));
    }
  }
  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.addEventListener("pointermove", handlePointerMove);

    return () => {
      if (!buttonRef.current) return;
      buttonRef.current.removeEventListener("pointermove", handlePointerMove);
    }
  }, [])

  return (
    <div ref={buttonRef} className="light-button">
      <span className="light-button__backdrop"></span>
      <span className="light-button__text">闪光的按钮</span>
    </div>
  )
}