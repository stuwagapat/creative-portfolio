import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadComplete, 500);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 20 + 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Terracotta, Sage, Sand, Slate colors
  const shapes = [
    { color: '#B25E4B', size: 140, x: '12%', y: '25%', delay: 0 },
    { color: '#7D8A74', size: 100, x: '82%', y: '18%', delay: 0.1 },
    { color: '#D5A779', size: 80, x: '72%', y: '72%', delay: 0.2 },
    { color: '#9AA7A9', size: 120, x: '22%', y: '78%', delay: 0.15 },
  ];

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F6F4F0]"
        >
          {/* Background shapes */}
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20 blur-3xl"
              style={{
                backgroundColor: shape.color,
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y,
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: shape.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Grain overlay */}
          <div className="grain" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              className="mb-8 text-center"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#1c1c1c66]">STUDIO</span>
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight mt-1"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  color: '#1C1C1C',
                }}
              >
                HET HUIS.
              </h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-56 h-1 bg-[#1c1c1c10] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: '#B25E4B',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <motion.p
              className="mt-3 text-xs text-neutral-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>

            {/* Loading text */}
            <motion.p
              className="mt-6 text-[10px] tracking-[0.2em] font-mono text-[#1c1c1c66] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Constructing calm...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
