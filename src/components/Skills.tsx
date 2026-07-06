import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/projects';

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 px-6">
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Tools I{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4ECDC4, #9B5DE5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Love
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            From motion graphics to web development, these are the tools that help bring my creative visions to life.
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 200,
                delay: i * 0.08,
              }}
              whileHover={{
                scale: 1.15,
                rotate: Math.random() * 20 - 10,
                zIndex: 10,
              }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              data-cursor="SKILL"
            >
              {/* Badge */}
              <div
                className="relative px-6 py-3 rounded-2xl font-semibold text-white shadow-lg backdrop-blur-sm border border-white/20"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: hoveredSkill === skill.name
                    ? `0 10px 40px ${skill.color}60`
                    : `0 4px 20px ${skill.color}40`,
                }}
              >
                {skill.name}
              </div>

              {/* Floating particles on hover */}
              {hoveredSkill === skill.name && (
                <>
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                      }}
                      animate={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60 - 20,
                        scale: 0,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional skills visualization */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-neutral-500 text-sm mb-6">And many more...</p>
          <div className="flex justify-center gap-2">
            {['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Three.js', 'GSAP', 'Docker'].map(
              (tech, i) => (
                <motion.div
                  key={tech}
                  className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.5 }}
                >
                  {tech}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
