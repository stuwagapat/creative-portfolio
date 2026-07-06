import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useMediaQuery';

export function BackgroundEffects() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Animated blobs */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#FF6B6B' }}
            initial={{ x: '-10%', y: '0%' }}
            animate={{
              x: ['-10%', '5%', '-10%'],
              y: ['0%', '10%', '0%'],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#4ECDC4', top: '50%', right: '-5%' }}
            initial={{ y: '0%' }}
            animate={{
              y: ['0%', '-15%', '0%'],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: '#FFE66D', bottom: '10%', left: '30%' }}
            initial={{ x: '0%', y: '0%' }}
            animate={{
              x: ['0%', '10%', '-5%', '0%'],
              y: ['0%', '-10%', '5%', '0%'],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          />
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#9B5DE5', top: '30%', left: '50%' }}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
