import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        {/* Logo / Signature */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-5xl md:text-7xl font-bold mb-4 italic"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Alex
          </h3>
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-center text-neutral-500 text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Designed with curiosity and crafted with care.
        </motion.p>

        {/* Links */}
        <div className="flex justify-center gap-8 mb-12">
          <FooterLink href="#works">Work</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-neutral-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {new Date().getFullYear()} Alex Creative. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="text-neutral-400 hover:text-white transition-colors relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-coral to-electric"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
