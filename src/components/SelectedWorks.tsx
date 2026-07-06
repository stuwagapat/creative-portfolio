import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';
import { projects, categories, Project } from '../data/projects';
import { useScrollLock } from '../hooks/useScrollLock';
import { useKeyboard } from '../hooks/useScrollLock';

export function SelectedWorks() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useScrollLock(!!selectedProject);
  useKeyboard('Escape', () => setSelectedProject(null));

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category.includes(activeCategory)
  );

  return (
    <section id="works" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Selected{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #9B5DE5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Works
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A curated collection of projects spanning motion design, branding, illustration, and interactive experiences.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, i) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white border-transparent'
                  : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
              }`}
              style={
                activeCategory === category
                  ? {
                      background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-cursor="FILTER"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="masonry-item"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const randomRotate = Math.random() * 4 - 2;

  return (
    <motion.div
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-lg"
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        rotate: randomRotate * 0.5,
        zIndex: 10,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      data-cursor="OPEN"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <motion.span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B20, #4ECDC420)',
              color: '#FF6B6B',
            }}
          >
            {project.category}
          </motion.span>
          <span className="text-sm text-neutral-500">{project.year}</span>
        </div>
        <h3
          className="text-lg font-semibold text-neutral-900"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          {project.title}
        </h3>
      </div>

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D)',
          padding: 2,
        }}
      >
        <div className="w-full h-full bg-white rounded-2xl" />
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="CLOSE"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Image carousel */}
        <div className="relative aspect-video bg-neutral-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
                data-cursor="PREV"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
                data-cursor="NEXT"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image indicators */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  data-cursor="VIEW"
                />
              ))}
            </div>
          )}
        </div>

        {/* Project info */}
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8ED4)' }}
            >
              {project.category}
            </span>
            <span className="text-sm text-neutral-500">{project.year}</span>
            <span className="text-sm text-neutral-500">•</span>
            <span className="text-sm text-neutral-500">{project.client}</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {project.title}
          </h2>

          <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tools */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">Tools Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex gap-3">
              {project.links.behance && (
                <a
                  href={project.links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full text-sm hover:bg-neutral-800 transition-colors"
                  data-cursor="VIEW"
                >
                  <Award className="w-4 h-4" />
                  Behance
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-300 rounded-full text-sm hover:border-neutral-900 transition-colors"
                  data-cursor="VIEW"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Site
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
