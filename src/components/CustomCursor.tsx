import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useMediaQuery';

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorText = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorText) {
        setIsHovering(true);
        setHoverText(cursorText);
      } else if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
        setHoverText('');
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setHoverText('');
    };

    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  if (isMobile) return null;
  // Default cursor is used; custom cursor is disabled.
  return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.3,
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isHovering ? 80 : 20,
            height: isHovering ? 80 : 20,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-bold text-black"
              style={{ fontSize: '10px', letterSpacing: '0.05em' }}
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          background: 'rgba(178, 94, 75, 0.15)',
          border: '1px solid rgba(178, 94, 75, 0.3)',
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 180,
          mass: 1,
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
