
import { useEffect,useRef } from 'react';
import '../styles/CustomCursor.css'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setTimeout(() => {
        if(cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
      }, 50);
    };
    const down = () => cursorRef.current?.classList.add('cursor-click');
    const up = () => cursorRef.current?.classList.remove('cursor-click');

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
};


export default CustomCursor
