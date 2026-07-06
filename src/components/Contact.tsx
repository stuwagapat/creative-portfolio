import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Mail, MonitorPlay, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../data/projects';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  MonitorPlay,
  Instagram,
  Linkedin,
};

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Let's build something{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              amazing
            </span>
            .
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something extraordinary together.
          </p>
        </motion.div>

        {/* Social buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {socialLinks.map((link, i) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <MagneticButton
                key={link.name}
                href={link.url}
                color={link.color}
                delay={i * 0.1}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{link.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            );
          })}
        </motion.div>

        {/* Decorative footer */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3">
            <span className="text-neutral-600">——</span>
            <span className="text-neutral-500 text-sm tracking-wider uppercase">Alex Creative</span>
            <span className="text-neutral-600">——</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  color,
  delay,
}: {
  children: React.ReactNode;
  href: string;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-6 py-4 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors group"
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      data-cursor="CONNECT"
    >
      <motion.div
        style={{ color }}
        whileHover={{ scale: 1.2, rotate: -10 }}
        transition={{ type: 'spring', damping: 10, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </motion.a>
  );
}
