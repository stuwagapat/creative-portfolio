import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, MapPin, Layers, Check, Plus, Instagram, Facebook } from 'lucide-react';
import { projects, materials, hotspots, Project, Material } from '../data/projects';
import { useScrollLock, useKeyboard } from '../hooks/useScrollLock';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = {
  plaster:     '#F2EDE6',
  obsidian:    '#1A1A18',
  terracotta:  '#C4614A',
  sage:        '#6B7A5E',
  sand:        '#D4A96A',
  slate:       '#8C9E9A',
  cream:       '#FAF6F1',
  warmgrey:    '#C8BFB5',
  chartreuse:  '#A4B86A',
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 35);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
      {val}{suffix}
    </div>
  );
}

// ─── GRID LINES BACKGROUND ────────────────────────────────────────────────────
function GridLines({ color = 'rgba(28,28,24,0.04)' }: { color?: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 8.33}%`, width: 1, background: color }} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 12.5}%`, height: 1, background: color }} />
      ))}
    </div>
  );
}

// ─── FLOATING PARTICLE ────────────────────────────────────────────────────────
function FloatingDot({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: color, pointerEvents: 'none', zIndex: 1 }}
      animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const TICKER = '✦ HET HUIS STUDIO  ✦ ARCHITECTURE  ✦ INTERIOR DESIGN  ✦ BESPOKE FURNITURE  ✦ TACTILE SPACES  ✦ HONEST MATERIALS  ✦ CRAFTED WITH CARE  ';

function Marquee() {
  const rep = TICKER.repeat(5);
  return (
    <div style={{ background: P.obsidian, padding: '11px 0', overflow: 'hidden', whiteSpace: 'nowrap', cursor: 'default' }}>
      <motion.div
        style={{ display: 'inline-block', color: P.sand, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', fontWeight: 700 }}
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
      >
        {rep}{rep}
      </motion.div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const ArrowSvg = () => (
  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
    <path d="M7.17418 1.66471L0.574525 1.66471L0.589256 0L10.0173 0L10.0173 9.42815L8.3527 9.44288L8.3527 2.84322L1.17851 10.0174L0 8.8389L7.17418 1.66471Z" fill="currentColor"/>
  </svg>
);

function Sidebar({ onNav }: { onNav: (id: string) => void }) {
  const navItems = [
    { id: 'hero',      num: '01', label: 'Overview' },
    { id: 'works',     num: '02', label: 'Our Work' },
    { id: 'room',      num: '03', label: 'Interior Room' },
    { id: 'materials', num: '04', label: 'Materials' },
    { id: 'about',     num: '05', label: 'The Studio' },
    { id: 'inquiry',   num: '06', label: 'Contact' },
  ];

  return (
    <aside style={{ width: 230, minWidth: 230, background: P.cream, borderRight: `1px solid ${P.warmgrey}55`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 0', position: 'sticky', top: 0, height: '100vh', zIndex: 40, cursor: 'default' }}>
      {/* Logo */}
      <div style={{ padding: '0 28px 28px', borderBottom: `1px solid ${P.warmgrey}44` }}>
        <div style={{ fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.2em', color: P.slate, textTransform: 'uppercase', marginBottom: 4 }}>STUDIO</div>
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 22, color: P.obsidian, letterSpacing: '-0.5px', margin: 0 }}
        >
          HET HUIS.
        </motion.h1>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {navItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            onClick={() => onNav(item.id)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '13px 28px', background: 'none', border: 'none', borderBottom: `1px solid ${P.warmgrey}33`, cursor: 'pointer', textAlign: 'left' }}
            whileHover={{ backgroundColor: P.plaster, x: 4 }}
          >
            <div>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: P.slate, letterSpacing: '0.1em', marginBottom: 2 }}>{item.num}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: P.obsidian, fontFamily: '"Space Grotesk", sans-serif' }}>{item.label}</div>
            </div>
            <motion.span style={{ color: P.obsidian }} whileHover={{ x: 3, y: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
              <ArrowSvg />
            </motion.span>
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '24px 28px', borderTop: `1px solid ${P.warmgrey}44` }}>
        <motion.button
          onClick={() => onNav('inquiry')}
          whileHover={{ backgroundColor: '#A0503A', scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: 'block', width: '100%', padding: '12px 0', background: P.terracotta, color: '#fff', border: 'none', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', textTransform: 'uppercase', marginBottom: 16 }}
        >
          Book Consultation
        </motion.button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: P.slate, letterSpacing: '0.12em' }}>EN / NL</span>
          <div style={{ display: 'flex', gap: 12 }}>
            <motion.a href="https://instagram.com" target="_blank" rel="noreferrer" whileHover={{ scale: 1.2, color: P.terracotta }} style={{ color: P.slate, display: 'flex' }}><Instagram size={14} /></motion.a>
            <motion.a href="https://facebook.com" target="_blank" rel="noreferrer" whileHover={{ scale: 1.2, color: P.terracotta }} style={{ color: P.slate, display: 'flex' }}><Facebook size={14} /></motion.a>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── REVEAL WRAPPER ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── SWEEP HOVER CARD (for project cards) ─────────────────────────────────────
function SweepCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${P.warmgrey}55`, background: '#fff', transition: 'box-shadow 0.3s' }}
    >
      {/* Sweep overlay */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: P.terracotta, zIndex: 10, pointerEvents: 'none', transformOrigin: 'left', scaleX: hovered ? 1 : 0 }}
        animate={{ scaleX: hovered ? 0.02 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Left colour bar */}
      <motion.div
        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: P.terracotta, zIndex: 11, scaleY: hovered ? 1 : 0, transformOrigin: 'top' }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div animate={hovered ? { y: -3, boxShadow: `0 14px 32px -6px rgba(26,26,24,0.14)` } : { y: 0, boxShadow: 'none' }} transition={{ duration: 0.25 }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function BentoPortfolio() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Architecture' | 'Furniture'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formType, setFormType] = useState('Architecture');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useScrollLock(!!selectedProject);
  useKeyboard('Escape', () => setSelectedProject(null));

  const filteredProjects = projects.filter(p => activeCategory === 'All' || p.category === activeCategory);
  const scrollToCard = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      setFormSubmitted(true);
      setTimeout(() => { setFormSubmitted(false); setFormName(''); setFormEmail(''); setFormMsg(''); }, 4000);
    }
  };

  return (
    <div style={{ background: P.plaster, minHeight: '100vh', display: 'flex', flexDirection: 'column', cursor: 'default' }}>
      <Marquee />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar onNav={scrollToCard} />
        </div>

        <main style={{ flex: 1, overflow: 'hidden' }}>

          {/* ══ ROW 1: HERO + STATS ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: `1px solid ${P.warmgrey}55` }}>

            {/* Hero */}
            <section id="hero" style={{ gridColumn: 'span 3', background: P.obsidian, padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 380, borderRight: `1px solid ${P.warmgrey}22`, position: 'relative', overflow: 'hidden' }}>
              <GridLines color="rgba(255,255,255,0.03)" />
              {/* Animated floating dots */}
              <FloatingDot x="82%" y="14%" size={10} color={P.sand} delay={0} />
              <FloatingDot x="90%" y="60%" size={6} color={P.terracotta} delay={1.2} />
              <FloatingDot x="70%" y="82%" size={8} color={P.sage} delay={0.6} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ overflow: 'hidden', display: 'inline-block', marginBottom: 24 }}
                >
                  <div style={{ background: P.terracotta, color: '#fff', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', whiteSpace: 'nowrap' }}>
                    Architecture & Interior
                  </div>
                </motion.div>

                {/* Staggered headline */}
                {['We build spaces', 'of honest', 'materials.'].map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, y: 40, skewY: 4 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(32px, 4vw, 62px)',
                      color: i === 1 ? P.sand : P.cream,
                      lineHeight: 1.06,
                      letterSpacing: '-1.5px',
                      overflow: 'hidden',
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                style={{ fontSize: 15, color: P.warmgrey, lineHeight: 1.7, maxWidth: 440, margin: 0, position: 'relative', zIndex: 2 }}
              >
                HET HUIS STUDIO is an architecture and interior design practice based in the Netherlands, crafting custom residences, interiors, and bespoke furniture rooted in honest materials, natural light, and spatial clarity.
              </motion.p>

              {/* Animated bottom line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', bottom: 0, left: 56, right: 56, height: 1, background: `linear-gradient(to right, ${P.terracotta}, transparent)`, transformOrigin: 'left', zIndex: 2 }}
              />
            </section>

            {/* Stats column */}
            <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column' }}>
              {[
                { value: 48, suffix: '+', label: 'Custom Homes', bg: P.terracotta, textColor: '#fff', labelColor: 'rgba(255,255,255,0.8)' },
                { value: 15, suffix: '', label: 'Years of Craft', bg: P.sand, textColor: P.obsidian, labelColor: P.obsidian + 'bb' },
                { value: 12, suffix: '', label: 'Design Awards', bg: P.sage, textColor: '#fff', labelColor: 'rgba(255,255,255,0.8)' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  style={{ background: stat.bg, padding: '36px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderBottom: `1px solid rgba(255,255,255,0.1)`, position: 'relative', overflow: 'hidden' }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Animated corner accent */}
                  <motion.div
                    style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, border: `1.5px solid rgba(255,255,255,0.2)` }}
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div style={{ color: stat.textColor }}><AnimatedNumber target={stat.value} suffix={stat.suffix} /></div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: stat.labelColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 6 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══ ROW 2: PHOTO + PILLARS ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', borderBottom: `1px solid ${P.warmgrey}55` }}>
            {/* Photo */}
            <div style={{ position: 'relative', minHeight: 460, overflow: 'hidden', borderRight: `1px solid ${P.warmgrey}55` }}>
              <motion.img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=compress&cs=tinysrgb&w=1200"
                alt="Villa Plaster & Light"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(26,26,24,0.85) 0%, transparent 100%)', padding: '40px 40px 32px' }}>
                <Reveal>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.sand, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Featured — 2025</div>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Villa Plaster & Light</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Almere, Netherlands</p>
                </Reveal>
              </div>
              {/* Animated scan line */}
              <motion.div
                style={{ position: 'absolute', left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${P.sand}66, transparent)`, pointerEvents: 'none' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Pillars */}
            <div style={{ background: P.slate, padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <GridLines color="rgba(255,255,255,0.04)" />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Reveal>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>Our Principles</div>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 24px' }}>Design Pillars</h3>
                </Reveal>
                {[
                  { n: '01', t: 'Honest Materials', d: 'Raw, unfilled surfaces that breathe and age with grace.' },
                  { n: '02', t: 'Spatial Silence', d: 'Architecture that choreographs quiet and calm.' },
                  { n: '03', t: 'Choreographed Light', d: 'Structures shaped around daily and seasonal daylight.' },
                  { n: '04', t: 'Bespoke Craft', d: 'Every object is made once, made to endure.' },
                ].map((p, i) => (
                  <Reveal key={p.n} delay={i * 0.08}>
                    <motion.div
                      style={{ display: 'flex', gap: 14, padding: '14px 0', borderTop: `1px solid rgba(255,255,255,0.1)` }}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)', paddingTop: 2, flexShrink: 0 }}>{p.n}</span>
                      <div>
                        <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{p.t}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{p.d}</div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
              <motion.button
                onClick={() => scrollToCard('works')}
                whileHover={{ backgroundColor: P.chartreuse + 'dd', x: 3 }}
                whileTap={{ scale: 0.96 }}
                style={{ marginTop: 28, padding: '12px 0', background: P.chartreuse, color: P.obsidian, border: 'none', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', position: 'relative', zIndex: 2 }}
              >
                View All Work ↗
              </motion.button>
            </div>
          </div>

          {/* ══ ROW 3: WORKS ══ */}
          <section id="works" style={{ padding: '56px 48px', borderBottom: `1px solid ${P.warmgrey}55`, position: 'relative', overflow: 'hidden' }}>
            <GridLines />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
                <Reveal>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.slate, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Selected Works</div>
                  <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(28px, 3vw, 46px)', fontWeight: 700, color: P.obsidian, margin: 0, letterSpacing: '-1px' }}>Houses & Furniture</h2>
                </Reveal>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['All', 'Architecture', 'Furniture'] as const).map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '8px 18px', border: `1.5px solid ${activeCategory === cat ? P.terracotta : P.warmgrey}`,
                        background: activeCategory === cat ? P.terracotta : 'transparent',
                        color: activeCategory === cat ? '#fff' : P.obsidian,
                        fontWeight: 600, fontSize: 12, cursor: 'pointer',
                        fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.04em', transition: 'all 0.2s',
                      }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <SweepCard onClick={() => setSelectedProject(project)}>
                        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                          <motion.img
                            src={project.coverImage}
                            alt={project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.5 }}
                          />
                          <div style={{ position: 'absolute', top: 10, left: 10, background: project.category === 'Architecture' ? P.terracotta : P.sage, color: '#fff', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 8px' }}>
                            {project.category}
                          </div>
                        </div>
                        <div style={{ padding: '18px 18px 16px' }}>
                          <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 15, color: P.obsidian, margin: '0 0 4px' }}>{project.title}</h4>
                          <p style={{ fontSize: 11, color: P.slate, margin: 0, fontFamily: 'monospace' }}>{project.location || project.dimensions}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: `1px solid ${P.warmgrey}33` }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey }}>{project.year}</span>
                            <motion.span whileHover={{ x: 3, y: -3 }} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: P.terracotta, fontWeight: 600 }}>
                              View <ArrowUpRight size={11} />
                            </motion.span>
                          </div>
                        </div>
                      </SweepCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* ══ ROW 4: HOTSPOT + MATERIALS ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${P.warmgrey}55` }}>

            {/* Hotspot room */}
            <section id="room" style={{ background: P.cream, padding: '48px 40px', borderRight: `1px solid ${P.warmgrey}55` }}>
              <Reveal>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.slate, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Interior</div>
                <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, color: P.obsidian, margin: '0 0 6px' }}>The Staged Room</h3>
                <p style={{ fontSize: 12, color: P.slate, margin: '0 0 22px', lineHeight: 1.7 }}>
                  Click the <span style={{ background: P.sand, color: P.obsidian, padding: '0 5px', fontWeight: 700 }}>+</span> indicators to discover each furniture piece.
                </p>
              </Reveal>
              <div style={{ position: 'relative', border: `1px solid ${P.warmgrey}44`, overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=compress&cs=tinysrgb&w=1000" alt="Living Room" style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />

                {/* Pulsing hotspot rings */}
                {hotspots.map((spot) => (
                  <div key={spot.id} style={{ position: 'absolute', left: spot.x, top: spot.y, transform: 'translate(-50%, -50%)' }}>
                    {/* Outer pulse ring */}
                    <motion.div
                      style={{ position: 'absolute', inset: -8, border: `1.5px solid ${P.sand}`, borderRadius: '50%', pointerEvents: 'none' }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: spot.id * 0.4 }}
                    />
                    <motion.button
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ width: 30, height: 30, borderRadius: '50%', background: P.sand, border: `2px solid #fff`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', position: 'relative', zIndex: 2 }}
                    >
                      <motion.div animate={{ rotate: activeHotspot === spot.id ? 45 : 0 }} transition={{ duration: 0.2 }}>
                        <Plus size={14} color={P.obsidian} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.9 }}
                          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', background: '#fff', border: `1px solid ${P.warmgrey}66`, padding: '14px 16px', width: 220, zIndex: 20, boxShadow: '0 8px 24px rgba(26,26,24,0.12)' }}
                        >
                          <div style={{ fontWeight: 700, fontSize: 12, color: P.terracotta, marginBottom: 3 }}>{spot.title}</div>
                          <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.sand, marginBottom: 8 }}>{spot.product}</div>
                          <p style={{ fontSize: 11, color: P.slate, margin: 0, lineHeight: 1.6 }}>{spot.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Materials */}
            <section id="materials" style={{ background: P.obsidian, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <GridLines color="rgba(255,255,255,0.025)" />
              <FloatingDot x="80%" y="10%" size={8} color={P.sand + '88'} delay={0.3} />
              <FloatingDot x="15%" y="70%" size={5} color={P.sage + '88'} delay={1.5} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <Reveal>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.sand, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>Library</div>
                  <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Tactile Materials</h3>
                  <p style={{ fontSize: 12, color: P.warmgrey, margin: '0 0 28px', lineHeight: 1.7 }}>Select a swatch to inspect each material specification.</p>
                </Reveal>

                <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
                  {materials.map((mat, i) => (
                    <motion.button
                      key={mat.name}
                      onClick={() => setSelectedMaterial(mat)}
                      title={mat.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, type: 'spring', stiffness: 260 }}
                      whileHover={{ scale: 1.18, y: -3 }}
                      style={{ width: 42, height: 42, borderRadius: '50%', background: mat.color, border: `3px solid ${selectedMaterial.name === mat.name ? '#fff' : 'transparent'}`, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.35)' }}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMaterial.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28 }}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}
                  >
                    <img src={selectedMaterial.image} alt={selectedMaterial.name} style={{ width: 50, height: 50, objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 3 }}>{selectedMaterial.name}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.sand, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{selectedMaterial.category}</div>
                      <p style={{ fontSize: 11, color: P.warmgrey, margin: 0, lineHeight: 1.6 }}>{selectedMaterial.description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
                  {[
                    { title: 'Local Sourcing', text: 'Dutch & Belgian quarries and forests.' },
                    { title: 'Ageing Beauty', text: 'Materials selected to grow more beautiful with time.' },
                  ].map((b, i) => (
                    <motion.div key={b.title} whileHover={{ y: -2, background: 'rgba(255,255,255,0.07)' }} transition={{ duration: 0.2 }}
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.07)`, padding: '12px 14px' }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: '#fff', marginBottom: 3, fontFamily: '"Space Grotesk", sans-serif' }}>{b.title}</div>
                      <p style={{ fontSize: 11, color: P.warmgrey, margin: 0, lineHeight: 1.6 }}>{b.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ══ ROW 5: ABOUT + CONTACT ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${P.warmgrey}55` }}>
            {/* About */}
            <section id="about" style={{ background: P.chartreuse, padding: '56px 48px', borderRight: `1px solid ${P.warmgrey}55`, position: 'relative', overflow: 'hidden' }}>
              <GridLines color="rgba(26,26,24,0.05)" />
              <FloatingDot x="88%" y="12%" size={12} color="rgba(26,26,24,0.12)" delay={0.8} />
              <FloatingDot x="8%" y="80%" size={8} color="rgba(26,26,24,0.08)" delay={2} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Reveal>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.obsidian + '77', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>The Studio</div>
                  <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700, color: P.obsidian, margin: '0 0 24px', letterSpacing: '-0.5px' }}>
                    Craft-rooted.<br />Client-centred.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p style={{ fontSize: 14, color: P.obsidian, lineHeight: 1.8, margin: '0 0 14px' }}>
                    HET HUIS STUDIO was founded by two architects who wanted to build residential spaces that feel quietly extraordinary – homes that breathe, hold light, and carry the specific character of those who live in them.
                  </p>
                  <p style={{ fontSize: 14, color: P.obsidian + 'bb', lineHeight: 1.8, margin: 0 }}>
                    We work from Almere and Amsterdam, designing homes across the Netherlands and Belgium, and producing our bespoke furniture from Dutch workshops.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div style={{ display: 'flex', gap: 24, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${P.obsidian}22` }}>
                    {[{ val: '100%', label: 'Custom made' }, { val: 'NL + BE', label: 'Service regions' }].map((s, i) => (
                      <div key={s.val}>
                        <motion.div
                          style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 28, fontWeight: 700, color: P.obsidian }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          {s.val}
                        </motion.div>
                        <div style={{ fontSize: 10, fontFamily: 'monospace', color: P.obsidian + '88', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Contact */}
            <section id="inquiry" style={{ background: P.cream, padding: '56px 48px' }}>
              <Reveal>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: P.slate, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Start a Project</div>
                <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, color: P.obsidian, margin: '0 0 28px', letterSpacing: '-0.5px' }}>
                  Let's build together.
                </h2>
              </Reveal>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      style={{ width: 52, height: 52, background: P.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}
                    >
                      <Check size={24} color="#fff" />
                    </motion.div>
                    <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 18, color: P.obsidian, margin: '0 0 8px' }}>Thank you</h4>
                    <p style={{ fontSize: 13, color: P.slate, margin: 0 }}>We will contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleFormSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[
                        { placeholder: 'Your Name', value: formName, setter: setFormName, type: 'text' },
                        { placeholder: 'Your Email', value: formEmail, setter: setFormEmail, type: 'email' },
                      ].map((f) => (
                        <motion.input
                          key={f.placeholder}
                          required type={f.type} placeholder={f.placeholder} value={f.value}
                          onChange={(e) => f.setter(e.target.value)}
                          whileFocus={{ borderColor: P.terracotta }}
                          style={{ background: '#fff', border: `1.5px solid ${P.warmgrey}77`, padding: '11px 13px', fontSize: 13, color: P.obsidian, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s', cursor: 'text' }}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Architecture', 'Furniture', 'Both'].map((type) => (
                        <motion.button
                          key={type} type="button" onClick={() => setFormType(type)}
                          whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}
                          style={{ padding: '7px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer', background: formType === type ? P.terracotta : '#fff', color: formType === type ? '#fff' : P.obsidian, border: `1.5px solid ${formType === type ? P.terracotta : P.warmgrey}`, transition: 'all 0.2s' }}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                    <motion.textarea
                      rows={3} placeholder="Tell us about your project..."
                      value={formMsg} onChange={(e) => setFormMsg(e.target.value)}
                      whileFocus={{ borderColor: P.terracotta }}
                      style={{ background: '#fff', border: `1.5px solid ${P.warmgrey}77`, padding: '11px 13px', fontSize: 13, color: P.obsidian, outline: 'none', fontFamily: 'inherit', resize: 'none', transition: 'border-color 0.2s', cursor: 'text' }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ backgroundColor: P.obsidian + 'dd', x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ padding: '14px 0', background: P.obsidian, color: '#fff', border: 'none', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }}
                    >
                      Send Consultation Request →
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </section>
          </div>

          {/* ══ FOOTER ══ */}
          <div style={{ background: P.obsidian, padding: '22px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <motion.span whileHover={{ color: P.sand }} transition={{ duration: 0.2 }} style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.5px', cursor: 'default' }}>HET HUIS.</motion.span>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey, letterSpacing: '0.1em' }}>© 2025 HET HUIS STUDIO — ALMERE & AMSTERDAM</span>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
                <motion.a key={s} href="#" whileHover={{ color: P.sand, y: -1 }} style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s}</motion.a>
              ))}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) { .hidden.lg\\:flex { display: none !important; } }
        *, *::before, *::after { cursor: default !important; }
        a, button, [role="button"] { cursor: pointer !important; }
        input, textarea, select { cursor: text !important; }
      `}</style>
    </div>
  );
}

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((p) => (p + 1) % project.images.length), [project.images.length]);
  const prev = useCallback(() => setIdx((p) => (p - 1 + project.images.length) % project.images.length), [project.images.length]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ backgroundColor: 'rgba(26,26,24,0.88)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden overflow-y-auto"
        style={{ background: '#fff' }}
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button onClick={onClose} whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, width: 34, height: 34, background: '#fff', border: `1px solid ${P.warmgrey}77`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={15} color={P.obsidian} />
        </motion.button>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: P.plaster }}>
          <AnimatePresence mode="wait">
            <motion.img key={idx} src={project.images[idx]} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
          {project.images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}><ChevronLeft size={16} /></button>
              <button onClick={next} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}><ChevronRight size={16} /></button>
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 18 : 5, height: 5, background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)', border: 'none', cursor: 'pointer', transition: 'width 0.2s' }} />
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ padding: '32px 38px 38px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${P.warmgrey}33` }}>
            <div>
              <div style={{ display: 'inline-block', background: project.category === 'Architecture' ? P.terracotta : P.sage, color: '#fff', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 8px', marginBottom: 10 }}>{project.category}</div>
              <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 26, fontWeight: 700, color: P.obsidian, margin: 0, letterSpacing: '-0.5px' }}>{project.title}</h2>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: 11 }}>
              <div style={{ color: P.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Client</div>
              <div style={{ fontWeight: 700, color: P.obsidian }}>{project.client}</div>
              <div style={{ color: P.slate, marginTop: 6 }}>{project.year}</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: P.slate, lineHeight: 1.8, margin: '0 0 26px' }}>{project.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            {project.location && (
              <div>
                <h4 style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>Location</h4>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13, fontWeight: 600, color: P.obsidian }}><MapPin size={13} color={P.terracotta} />{project.location}</div>
              </div>
            )}
            {project.dimensions && (
              <div>
                <h4 style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>Dimensions</h4>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13, fontWeight: 600, color: P.obsidian }}><Layers size={13} color={P.sage} />{project.dimensions}</div>
              </div>
            )}
            <div style={{ gridColumn: 'span 2' }}>
              <h4 style={{ fontFamily: 'monospace', fontSize: 10, color: P.warmgrey, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 10px' }}>Material Specification</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {project.tools.map((mat) => (
                  <motion.span key={mat} whileHover={{ y: -1, background: P.plaster }} style={{ padding: '4px 11px', background: P.plaster, border: `1px solid ${P.warmgrey}44`, fontSize: 12, color: P.obsidian, fontWeight: 500, transition: 'all 0.2s' }}>{mat}</motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
