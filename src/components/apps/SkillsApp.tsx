import { motion } from 'framer-motion';
import { Layout, Server, Code2, Wrench, CheckCircle } from 'lucide-react';
import { skillCategories } from '@/data/portfolio';

const categoryIcons: Record<string, typeof Layout> = {
  'Frontend Development': Layout,
  'Backend and Web Development': Server,
  Programming: Code2,
  'Tools and Additional Learning': Wrench,
};

const categoryAccents: Record<string, { border: string; bg: string; text: string }> = {
  'Frontend Development': {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-300',
  },
  'Backend and Web Development': {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
  },
  Programming: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
  },
  'Tools and Additional Learning': {
    border: 'border-fuchsia-500/30',
    bg: 'bg-fuchsia-500/10',
    text: 'text-fuchsia-300',
  },
};

export function SkillsApp() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/60">
          Core competencies developed through practical projects, coursework, and internship experience.
        </p>
      </div>

      <div className="space-y-4">
        {skillCategories.map((group, gi) => {
          const Icon = categoryIcons[group.category] || Code2;
          const styling = categoryAccents[group.category] || {
            border: 'border-white/10',
            bg: 'bg-ink-700/40',
            text: 'text-accent-300',
          };

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.08 }}
              className="rounded-xl border border-white/10 bg-ink-800/40 p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${styling.border} ${styling.bg}`}
                >
                  <Icon className={`h-4 w-4 ${styling.text}`} />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.02, y: -1 }}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink-700/60 px-3 py-1.5 text-xs text-white/85 shadow-sm transition hover:border-accent-400/40 hover:bg-ink-700/90"
                  >
                    <CheckCircle className="h-3 w-3 text-accent-400 shrink-0" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
