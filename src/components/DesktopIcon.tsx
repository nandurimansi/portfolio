import { motion } from 'framer-motion';
import {
  User,
  FolderGit2,
  Code2,
  Award,
  FileText,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'resume'
  | 'contact';

export const apps: {
  id: AppId;
  label: string;
  icon: LucideIcon;
  tint: string;
}[] = [
  { id: 'about', label: 'About Me', icon: User, tint: 'text-cyan-300' },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderGit2,
    tint: 'text-emerald-300',
  },
  { id: 'skills', label: 'Skills', icon: Code2, tint: 'text-amber-300' },
  {
    id: 'certifications',
    label: 'Certificates',
    icon: Award,
    tint: 'text-violet-300',
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileText,
    tint: 'text-fuchsia-300',
  },
  { id: 'contact', label: 'Contact', icon: Mail, tint: 'text-blue-300' },
];

export function DesktopIcon({
  app,
  onOpen,
  index,
}: {
  app: (typeof apps)[number];
  onOpen: (id: AppId) => void;
  index: number;
}) {
  const Icon = app.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 14, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 220 }}
      onDoubleClick={() => onOpen(app.id)}
      onClick={(e) => {
        // single click on touch counts as open
        if (e.detail === 1 && window.matchMedia('(pointer: coarse)').matches) {
          onOpen(app.id);
        }
      }}
      className="group flex w-24 flex-col items-center gap-2 rounded-lg p-2 no-select transition hover:bg-white/5 focus:bg-white/10 focus:outline-none"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-700/70 shadow-glow-sm transition group-hover:scale-105 group-hover:border-white/20">
        <Icon className={`h-6 w-6 ${app.tint}`} />
      </span>
      <span className="text-center text-[11px] font-medium text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {app.label}
      </span>
    </motion.button>
  );
}
