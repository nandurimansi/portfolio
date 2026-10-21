import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Linkedin,
  Github,
  Sparkles,
  ArrowRight,
  Mail,
  Award,
  Users,
} from 'lucide-react';
import { profile, achievements } from '@/data/portfolio';
import type { AppId } from '@/components/DesktopIcon';

export function AboutApp({
  onOpenApp,
}: {
  onOpenApp?: (id: AppId) => void;
}) {
  const cybrix = achievements[0];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/30 to-blue-500/20 text-2xl font-bold text-accent-200 shadow-glow-sm">
          NM
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>
          <p className="text-xs sm:text-sm font-medium text-accent-300">
            {profile.role}
          </p>
          <p className="mt-1 text-xs text-white/70 italic">
            "{profile.headline}"
          </p>
        </div>
      </div>

      {/* Hero Introduction */}
      <div className="rounded-xl border border-white/10 bg-ink-800/40 p-4">
        <p className="text-xs sm:text-sm leading-relaxed text-white/80">
          {profile.introduction}
        </p>

        {/* Action CTAs */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenApp?.('projects')}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-500 to-accent-400 px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition hover:brightness-110 shadow-glow-sm"
          >
            Explore My Work <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => onOpenApp?.('contact')}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-ink-700/60 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-accent-400/40 hover:text-accent-200"
          >
            <Mail className="h-3.5 w-3.5" /> Get in Touch
          </button>

          <a
            href="https://www.linkedin.com/in/nanduri-mansi/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>

          <a
            href="https://github.com/nandurimansi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>
      </div>

      {/* About Me Section */}
      <section className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-accent-300">
          About Me
        </h3>
        <div className="rounded-xl border border-white/10 bg-ink-700/30 p-4 space-y-3 text-xs leading-relaxed text-white/75">
          <p>
            I'm Nanduri Mansi, an engineering student at Joginpally B.R.
            Engineering College with a strong interest in web development and
            software engineering. I enjoy creating responsive websites,
            implementing interactive functionality, and exploring technologies
            that help turn ideas into practical applications.
          </p>
          <p>
            My experience includes frontend development with HTML, CSS, and
            JavaScript, along with learning full-stack application development
            using Laravel, PHP, REST APIs, and MySQL. Through internships,
            technical projects, certifications, and hackathon participation, I
            continue to strengthen my development skills and work toward building
            reliable, user-friendly software.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-ink-700/40 p-3.5">
          <div className="flex items-center gap-2 text-white/50 mb-1">
            <GraduationCap className="h-4 w-4 text-accent-300" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              Education
            </span>
          </div>
          <p className="text-xs font-medium text-white/90">
            {profile.institution}
          </p>
          <p className="text-[11px] text-white/50">{profile.educationPeriod}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-ink-700/40 p-3.5">
          <div className="flex items-center gap-2 text-white/50 mb-1">
            <Briefcase className="h-4 w-4 text-emerald-300" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              Current Role
            </span>
          </div>
          <p className="text-xs font-medium text-white/90">
            Full-Stack Web Dev Intern
          </p>
          <p className="text-[11px] text-white/50">Yalu India · Ongoing</p>
        </div>
      </div>

      {/* Leadership Highlight */}
      {cybrix && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Leadership & Hackathons
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-amber-300/90 font-mono">
              <Award className="h-3 w-3" /> {cybrix.team}
            </span>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white">{cybrix.title}</p>
              <span className="text-[10px] text-accent-300 font-mono bg-ink-800/80 px-2 py-0.5 rounded border border-white/10">
                {cybrix.role}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/70">
              {cybrix.description}
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-white/50">
              <Users className="h-3 w-3 text-white/40 shrink-0" />
              <span>Teammates: {cybrix.collaborators.join(', ')}</span>
            </div>
          </div>
        </section>
      )}

      {/* Availability Status */}
      <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>Available for Internships & Software Projects</span>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Verified LinkedIn */}
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-wider text-white/40">
          Verified Profile
        </p>
        <motion.a
          href="https://www.linkedin.com/in/nanduri-mansi/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-ink-700/60 px-3 py-2 text-xs text-white/80 transition hover:border-accent-400/40 hover:text-accent-200"
        >
          <Linkedin className="h-3.5 w-3.5 text-blue-400" />
          <span>linkedin.com/in/nanduri-mansi</span>
        </motion.a>
      </div>
    </div>
  );
}
