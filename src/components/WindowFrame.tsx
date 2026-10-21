import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type WindowState = {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
};

export function WindowFrame({
  state,
  onClose,
  onFocus,
  onMinimize,
  children,
}: {
  state: WindowState;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  children: ReactNode;
}) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [, force] = useState(0);

  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      state.x = Math.max(0, dragRef.current.origX + dx);
      state.y = Math.max(28, dragRef.current.origY + dy);
      force((n) => n + 1);
    };
    const up = () => {
      dragRef.current = null;
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isMobile, state]);

  if (state.minimized) return null;

  const startDrag = (e: React.MouseEvent) => {
    if (isMobile) return;
    onFocus();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: state.x,
      origY: state.y,
    };
  };

  const style: React.CSSProperties = isMobile
    ? {
        left: 8,
        top: 40,
        width: 'calc(100vw - 16px)',
        height: 'calc(100vh - 56px)',
        zIndex: state.z,
      }
    : {
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: state.z,
      };

  return (
    <AnimatePresence>
      <motion.div
        key={state.id}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={style}
        onMouseDown={onFocus}
        className="absolute flex flex-col overflow-hidden rounded-xl border border-white/10 glass shadow-window"
      >
        <div
          onMouseDown={startDrag}
          className="flex h-9 shrink-0 items-center justify-between border-b border-white/10 bg-ink-800/80 px-3 no-select"
          style={{ cursor: isMobile ? 'default' : 'grab' }}
        >
          <span className="text-xs font-medium text-white/70">
            {state.title}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400/80 text-black/0 transition hover:text-black/70"
              aria-label="Minimize"
            >
              <Minus className="h-2.5 w-2.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/90 text-black/0 transition hover:text-black/80"
              aria-label="Close"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-ink-900/40 p-4 sm:p-5">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
