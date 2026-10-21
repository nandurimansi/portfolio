import { motion, AnimatePresence } from 'framer-motion';
import { Power, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { bootLines } from '@/data/portfolio';

type Phase = 'off' | 'booting' | 'ready';

export function Computer({ onReady }: { onReady: () => void }) {
  const [phase, setPhase] = useState<Phase>('off');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const handlePower = () => {
    if (phase !== 'off') return;
    setPhase('booting');
  };

  useEffect(() => {
    const autoPowerTimer = window.setTimeout(() => {
      setPhase((prev) => (prev === 'off' ? 'booting' : prev));
    }, 400);
    return () => clearTimeout(autoPowerTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'booting') return;
    const timers: number[] = [];
    bootLines.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleLines(i + 1);
          setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        }, line.delay)
      );
    });
    const done = window.setTimeout(() => setPhase('ready'), 2700);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase === 'ready') {
      const t = window.setTimeout(onReady, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onReady]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-ink-950 overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Monitor */}
        <motion.div
          animate={
            phase === 'ready'
              ? { scale: 2.4, y: 40, opacity: 0 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="relative"
        >
          {/* Screen bezel */}
          <div className="relative w-[min(82vw,640px)] aspect-[16/10] rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-3 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-black scanline">
              <AnimatePresence mode="wait">
                {phase === 'off' && (
                  <motion.div
                    key="off"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    <div className="text-center">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
                        No Signal
                      </p>
                    </div>
                  </motion.div>
                )}

                {(phase === 'booting' || phase === 'ready') && (
                  <motion.div
                    key="on"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col bg-gradient-to-b from-ink-900 to-black px-5 py-4 sm:px-8 sm:py-6"
                  >
                    <div className="mb-4 flex items-center gap-2 text-accent-400">
                      <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-mono text-xs sm:text-sm tracking-widest text-glow">
                        MANSI OS
                      </span>
                    </div>

                    <div className="flex-1 font-mono text-[10px] sm:text-xs leading-relaxed text-white/70">
                      {bootLines.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={
                            i === visibleLines - 1
                              ? 'text-accent-300'
                              : 'text-white/60'
                          }
                        >
                          <span className="text-accent-500/70">$</span>{' '}
                          {line.text}
                          {i === visibleLines - 1 && phase === 'booting' && (
                            <span className="cursor-blink">▊</span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* progress bar */}
                    <div className="mt-3">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent-500 to-accent-300"
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: 'easeOut', duration: 0.3 }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between font-mono text-[9px] text-white/40">
                        <span>loading portfolio</span>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Power button */}
            <motion.button
              onClick={handlePower}
              disabled={phase !== 'off'}
              animate={phase === 'booting' ? { scale: [1, 0.85, 1] } : {}}
              transition={{ duration: 0.25 }}
              aria-label="Power on the monitor"
              className="group absolute -bottom-1 right-6 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink-700 transition disabled:cursor-default"
            >
              <Power
                className={`h-3.5 w-3.5 transition ${
                  phase === 'off'
                    ? 'text-white/40 group-hover:text-accent-300 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]'
                    : 'text-accent-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]'
                }`}
              />
            </motion.button>
          </div>

          {/* Stand */}
          <div className="mx-auto h-10 w-32 bg-gradient-to-b from-ink-700 to-ink-800" />
          <div className="mx-auto h-2 w-48 rounded-b-md bg-ink-800 shadow-[0_10px_30px_rgba(0,0,0,0.6)]" />
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'ready' ? 0 : 1 }}
          className="mt-10 text-center"
        >
          <p className="font-mono text-xs text-white/40">
            {phase === 'off' && 'Powering on automatically…'}
            {phase === 'booting' && 'Booting…'}
            {phase === 'ready' && 'Welcome'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
