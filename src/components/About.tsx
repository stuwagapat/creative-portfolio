import { motion } from 'framer-motion';
import { funFacts } from '../data/projects';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-neutral-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5)',
                }}
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Alex Creative"
                className="relative z-10 w-full h-full object-cover mix-blend-overlay opacity-90"
              />
              {/* Paper cut effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/30 to-transparent z-20" />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-60"
              style={{ background: '#FFE66D' }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-40"
              style={{ background: '#4ECDC4' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              About{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Me
              </span>
            </h2>

            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed mb-8">
              <p>
                I'm a multidisciplinary creative designer based in San Francisco with a passion for
                crafting memorable digital experiences. With over 8 years of experience, I've had the
                privilege of working with amazing brands and startups around the world.
              </p>
              <p>
                My approach combines bold visual storytelling with purposeful motion design, creating
                work that not only looks stunning but also tells compelling stories and drives results.
              </p>
              <p>
                When I'm not pushing pixels, you'll find me exploring new design tools, teaching
                workshops, or hunting down the best coffee spots in the city.
              </p>
            </div>

            {/* Fun facts */}
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Fun Facts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: Math.random() * 6 - 3,
                  }}
                  data-cursor="INFO"
                >
                  <div className="text-3xl mb-2">{fact.emoji}</div>
                  <div className="text-sm font-semibold text-neutral-900">{fact.label}</div>
                  <div className="text-xs text-neutral-500">{fact.description}</div>

                  {/* Hover gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B30, #4ECDC430)',
                      zIndex: -1,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
