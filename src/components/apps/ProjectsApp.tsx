import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Info, CheckCircle2, X, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { projects, type Project } from '@/data/portfolio';

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/60">
          Featured academic and internship web development projects.
        </p>
        <span className="text-[10px] font-mono text-accent-300">
          {projects.length} Projects
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-ink-700/40 hover:border-white/20 transition shadow-sm"
          >
            <div>
              <div
                className={`relative h-20 bg-gradient-to-br ${p.accent} flex items-end justify-between p-3 border-b border-white/5`}
              >
                <span className="font-mono text-[10px] text-white/60">
                  /{p.id}
                </span>
                <span className="rounded bg-black/40 px-2 py-0.5 text-[9px] font-mono text-accent-200 backdrop-blur-sm border border-white/10">
                  {p.type}
                </span>
              </div>
              <div className="p-3.5 space-y-2">
                <h3 className="text-sm font-semibold text-white group-hover:text-accent-200 transition">
                  {p.name}
                </h3>
                <p className="text-xs text-accent-300/90 font-medium">
                  {p.tagline}
                </p>
                <p className="text-xs leading-relaxed text-white/65">
                  {p.description}
                </p>
              </div>
            </div>

            <div className="p-3.5 pt-0 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/10 bg-ink-800/80 px-2 py-0.5 text-[10px] font-mono text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <button
                  onClick={() => setSelectedProject(p)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-accent-300 transition hover:text-accent-100 font-medium"
                >
                  <Info className="h-3 w-3" /> View Details
                </button>
                <span className="text-[10px] text-white/40 font-mono">
                  Verified Project
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative max-w-lg w-full overflow-hidden rounded-xl border border-white/15 bg-ink-900 p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded bg-accent-500/10 px-2 py-0.5 text-[10px] font-mono text-accent-300 border border-accent-400/20">
                    {selectedProject.type}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-white">
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs text-accent-300">
                    {selectedProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Description
                </h4>
                <p className="text-xs leading-relaxed text-white/75 bg-ink-800/50 p-3 rounded-lg border border-white/5">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 rounded border border-white/10 bg-ink-800 px-2 py-1 text-[11px] font-mono text-accent-200"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {selectedProject.repoUrl ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/15 hover:bg-purple-500/25 px-3 py-1.5 text-xs font-medium text-purple-200 transition"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>View on GitHub</span>
                    <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                  </a>
                ) : (
                  <span className="text-[10px] text-white/40 font-mono">
                    Academic Showcase
                  </span>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-lg bg-ink-700 px-3.5 py-1.5 text-xs text-white/80 hover:bg-ink-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
