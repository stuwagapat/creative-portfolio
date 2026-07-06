import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useIsMobile } from '../hooks/useMediaQuery';

const floatingElements = [
  { type: 'circle', color: '#FF6B6B', size: 40, x: '10%', y: '15%', delay: 0 },
  { type: 'square', color: '#4ECDC4', size: 25, x: '85%', y: '25%', delay: 0.2 },
  { type: 'triangle', color: '#FFE66D', size: 35, x: '75%', y: '70%', delay: 0.4 },
  { type: 'cross', color: '#9B5DE5', size: 30, x: '20%', y: '75%', delay: 0.3 },
  { type: 'star', color: '#FF8ED4', size: 28, x: '50%', y: '10%', delay: 0.1 },
  { type: 'smiley', color: '#FF6B6B', size: 50, x: '90%', y: '50%', delay: 0.5 },
  { type: 'arrow', color: '#00F5D4', size: 35, x: '5%', y: '50%', delay: 0.15 },
];

export function Hero() {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    document.getElementById('hero')?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background: '#FF6B6B',
            left: '10%',
            top: '20%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
          style={{
            background: '#4ECDC4',
            right: '15%',
            bottom: '30%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full opacity-30 blur-3xl"
          style={{
            background: '#FFE66D',
            right: '30%',
            top: '60%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      {!isMobile && floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: el.x,
            top: el.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mouse.normalizedX * 20,
            y: mouse.normalizedY * 20,
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            opacity: { delay: el.delay, duration: 0.5 },
            scale: { delay: el.delay, duration: 0.5, type: 'spring' },
            x: { type: 'spring', damping: 50, stiffness: 100 },
            y: { type: 'spring', damping: 50, stiffness: 100 },
            rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <FloatingShape type={el.type} color={el.color} size={el.size} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#FF6B6B' }} />
            <span className="text-sm text-neutral-600">Available for freelance projects</span>
          </motion.div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hi, I'm{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Alex
              </span>
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I design things
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              that{' '}
              <span
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #FF8ED4, #FFE66D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                move people
              </span>
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          A multidisciplinary creative designer crafting memorable experiences through motion,
          graphics, illustration, and digital design.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #FF8ED4)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="VIEW"
          >
            View Projects
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-neutral-300 text-neutral-700 bg-white/50 backdrop-blur-sm"
            whileHover={{
              scale: 1.05,
              borderColor: '#FF6B6B',
              color: '#FF6B6B',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="EMAIL"
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-neutral-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingShape({ type, color, size }: { type: string; color: string; size: number }) {
  switch (type) {
    case 'circle':
      return (
        <motion.div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      );
    case 'square':
      return (
        <motion.div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: 6,
            transform: 'rotate(15deg)',
          }}
          animate={{ rotate: [15, 25, 15] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      );
    case 'triangle':
      return (
        <motion.div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }}
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      );
    case 'cross':
      return (
        <div style={{ fontSize: size, color, fontWeight: 'bold' }}>+</div>
      );
    case 'star':
      return (
        <motion.div
          style={{ fontSize: size, color }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ★
        </motion.div>
      );
    case 'smiley':
      return (
        <motion.div
          style={{ fontSize: size }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          😊
        </motion.div>
      );
    case 'arrow':
      return (
        <motion.div
          style={{ fontSize: size, color }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↗
        </motion.div>
      );
    default:
      return null;
  }
}
