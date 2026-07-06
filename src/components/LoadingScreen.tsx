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
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  const shapes = [
    { color: '#FF6B6B', size: 120, x: '15%', y: '30%', delay: 0 },
    { color: '#4ECDC4', size: 80, x: '80%', y: '20%', delay: 0.1 },
    { color: '#FFE66D', size: 60, x: '70%', y: '70%', delay: 0.2 },
    { color: '#9B5DE5', size: 100, x: '25%', y: '75%', delay: 0.15 },
  ];

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-50"
        >
          {/* Background shapes */}
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-30 blur-2xl"
              style={{
                backgroundColor: shape.color,
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <h1
                className="text-6xl md:text-8xl font-bold"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Alex
              </h1>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FF6B6B, #9B5DE5, #4ECDC4)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <motion.p
              className="mt-4 text-sm text-neutral-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>

            {/* Loading text */}
            <motion.p
              className="mt-8 text-xs tracking-widest text-neutral-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              LOADING CREATIVITY...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
