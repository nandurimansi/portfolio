import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { apps, DesktopIcon, type AppId } from './DesktopIcon';
import { WindowFrame, type WindowState } from './WindowFrame';
import { MenuBar } from './MenuBar';
import { AboutApp } from './apps/AboutApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { SkillsApp } from './apps/SkillsApp';
import { CertificationsApp } from './apps/CertificationsApp';
import { ResumeApp } from './apps/ResumeApp';
import { ContactApp } from './apps/ContactApp';

const titles: Record<AppId, string> = {
  about: 'About Me — Nanduri Mansi',
  projects: 'Featured Projects',
  skills: 'Technical Skills',
  certifications: 'Certifications & Learning',
  resume: 'Resume & Experience',
  contact: 'Get in Touch',
};

const defaultSize: Record<AppId, { w: number; h: number }> = {
  about: { w: 560, h: 620 },
  projects: { w: 660, h: 620 },
  skills: { w: 540, h: 580 },
  certifications: { w: 640, h: 600 },
  resume: { w: 580, h: 640 },
  contact: { w: 480, h: 560 },
};

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(() => {
    const size = defaultSize.about;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    const x = Math.max(
      16,
      Math.min(vw - size.w - 16, Math.round((vw - size.w) / 2))
    );
    const y = Math.max(
      48,
      Math.min(vh - size.h - 16, Math.round((vh - size.h) / 2))
    );
    return [
      {
        id: 'about',
        title: titles.about,
        x,
        y,
        width: size.w,
        height: size.h,
        z: 11,
        minimized: false,
      },
    ];
  });
  const [zTop, setZTop] = useState(11);

  const openApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        const nextZ = zTop + 1;
        setZTop(nextZ);
        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: nextZ } : w
          );
        }
        const size = defaultSize[id];
        const offset = prev.length * 28;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const x = Math.max(
          16,
          Math.min(vw - size.w - 16, (vw - size.w) / 2 + offset - 80)
        );
        const y = Math.max(40, Math.min(vh - size.h - 16, 56 + offset));
        return [
          ...prev,
          {
            id,
            title: titles[id],
            x,
            y,
            width: size.w,
            height: size.h,
            z: nextZ,
            minimized: false,
          },
        ];
      });
    },
    [zTop]
  );

  const close = (id: string) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));

  const focus = (id: string) => {
    setWindows((prev) => {
      const top = prev.find((w) => w.id === id);
      if (top && top.z === zTop) return prev;
      const nextZ = zTop + 1;
      setZTop(nextZ);
      return prev.map((w) => (w.id === id ? { ...w, z: nextZ } : w));
    });
  };

  const minimize = (id: string) =>
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );

  const renderApp = (id: AppId) => {
    switch (id) {
      case 'about':
        return <AboutApp onOpenApp={openApp} />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'certifications':
        return <CertificationsApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-screen w-screen overflow-hidden bg-ink-950"
    >
      {/* Wallpaper */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-black" />
        <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-700/10 blur-[120px]" />
        <div className="absolute left-10 top-24 h-64 w-64 rounded-full bg-emerald-600/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute left-4 top-12 flex flex-col gap-3">
        {apps.map((app, i) => (
          <DesktopIcon
            key={app.id}
            app={app}
            index={i}
            onOpen={openApp}
          />
        ))}
      </div>

      {/* Center hint */}
      {windows.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <p className="font-mono text-xs text-white/25">
            double-click an icon to open
          </p>
        </motion.div>
      )}

      {/* Windows */}
      <AnimatePresence>
        {windows.map((w) => (
          <WindowFrame
            key={w.id}
            state={w}
            onClose={() => close(w.id)}
            onFocus={() => focus(w.id)}
            onMinimize={() => minimize(w.id)}
          >
            {renderApp(w.id as AppId)}
          </WindowFrame>
        ))}
      </AnimatePresence>

      {/* Minimized dock */}
      {windows.some((w) => w.minimized) && (
        <div className="absolute bottom-3 left-1/2 z-[6000] flex -translate-x-1/2 gap-2 rounded-xl border border-white/10 bg-ink-800/80 p-2 backdrop-blur-md">
          {windows
            .filter((w) => w.minimized)
            .map((w) => {
              const app = apps.find((a) => a.id === w.id)!;
              const Icon = app.icon;
              return (
                <button
                  key={w.id}
                  onClick={() =>
                    setWindows((prev) =>
                      prev.map((p) =>
                        p.id === w.id
                          ? { ...p, minimized: false, z: zTop + 1 }
                          : p
                      )
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-ink-700/70 transition hover:border-accent-400/40"
                  title={w.title}
                >
                  <Icon className={`h-4 w-4 ${app.tint}`} />
                </button>
              );
            })}
        </div>
      )}
    </motion.div>
  );
}
