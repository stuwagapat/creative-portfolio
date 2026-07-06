import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, RotateCcw } from 'lucide-react';
import { colorPalettes, getRandomPalette } from '../utils/palette';
import { useIsMobile } from '../hooks/useMediaQuery';

interface DraggableSticker {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

const emojis = ['✦', '★', '◆', '▲', '●', '■', '♦', '☆', '○', '△', '□', '◇', '🌈', '🎨', '✨', '💫'];

export function CreativePlayground() {
  const [currentPalette, setCurrentPalette] = useState(colorPalettes[0]);
  const [stickers, setStickers] = useState<DraggableSticker[]>([]);
  const isMobile = useIsMobile();

  const generatePalette = useCallback(() => {
    const newPalette = getRandomPalette(currentPalette.name);
    setCurrentPalette(newPalette);

    // Update CSS custom properties
    const root = document.documentElement;
    Object.entries(newPalette.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [currentPalette.name]);

  const addSticker = () => {
    const newSticker: DraggableSticker = {
      id: Date.now(),
      x: Math.random() * (isMobile ? 280 : 400) + 50,
      y: Math.random() * 200 + 50,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 40 - 20,
      scale: 0.8 + Math.random() * 0.6,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const clearStickers = () => {
    setStickers([]);
  };

  // Initialize some stickers
  useEffect(() => {
    const initialStickers = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (isMobile ? 280 : 400) + 50,
      y: Math.random() * 200 + 50,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 40 - 20,
      scale: 0.8 + Math.random() * 0.6,
    }));
    setStickers(initialStickers);
  }, [isMobile]);

  return (
    <section
      id="playground"
      className="py-24 md:py-32 px-6"
      style={{
        background: `linear-gradient(135deg, ${currentPalette.colors.coral}10, ${currentPalette.colors.electric}10)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Creative{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFE66D, #FF8ED4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Playground
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            A space for exploration and experimentation. Click around, drag things, and watch the colors come alive!
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={generatePalette}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentPalette.colors.coral}, ${currentPalette.colors.lavender})`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="SHUFFLE"
            >
              <Shuffle className="w-5 h-5" />
              Generate Random Palette
            </motion.button>

            <motion.button
              onClick={addSticker}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-neutral-300 font-semibold hover:border-neutral-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="ADD"
            >
              Add Sticker
            </motion.button>

            <motion.button
              onClick={clearStickers}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 font-semibold hover:bg-neutral-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="CLEAR"
            >
              <RotateCcw className="w-5 h-5" />
              Clear
            </motion.button>
          </div>
        </motion.div>

        {/* Playground area */}
        <motion.div
          className="relative h-80 md:h-96 rounded-3xl overflow-hidden border-2 border-dashed border-neutral-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Background blobs */}
          <motion.div
            className="absolute w-32 h-32 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: currentPalette.colors.coral, left: '20%', top: '30%' }}
            animate={{ scale: [1, 1.5, 1], x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-40 h-40 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: currentPalette.colors.electric, right: '15%', bottom: '20%' }}
            animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />

          {/* Draggable stickers */}
          <AnimatePresence>
            {stickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                className="absolute cursor-grab active:cursor-grabbing select-none"
                style={{
                  left: sticker.x,
                  top: sticker.y,
                  fontSize: `${sticker.scale * 40}px`,
                  rotate: sticker.rotation,
                }}
                drag
                dragMomentum={false}
                whileDrag={{
                  scale: 1.2,
                  rotate: sticker.rotation + 10,
                  zIndex: 100,
                }}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, rotate: 45 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                onDragEnd={() => {
                  // Sticker placement is finalized
                }}
                data-cursor="DRAG"
              >
                {sticker.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Gradient mesh overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${currentPalette.colors.coral}, transparent 50%),
                           radial-gradient(circle at 70% 60%, ${currentPalette.colors.electric}, transparent 50%),
                           radial-gradient(circle at 50% 80%, ${currentPalette.colors.lavender}, transparent 50%)`,
            }}
          />
        </motion.div>

        {/* Current palette display */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-neutral-500 text-center mb-4">
            Current Palette: <span className="font-semibold">{currentPalette.name}</span>
          </p>
          <div className="flex justify-center gap-3">
            {Object.entries(currentPalette.colors).map(([name, color]) => (
              <motion.div
                key={name}
                className="relative group"
                whileHover={{ scale: 1.2 }}
              >
                <div
                  className="w-10 h-10 rounded-full shadow-md"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-neutral-500">{name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
