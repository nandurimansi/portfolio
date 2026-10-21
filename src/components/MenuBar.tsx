import { useEffect, useState } from 'react';
import { Wifi, Volume2, BatteryMedium } from 'lucide-react';
import { profile } from '@/data/portfolio';

export function MenuBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = window.setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatted = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const date = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="absolute left-0 right-0 top-0 z-[5000] flex h-7 items-center justify-between border-b border-white/10 bg-ink-900/80 px-3 text-[11px] text-white/70 backdrop-blur-md no-select">
      <div className="flex items-center gap-2 font-medium">
        <span className="text-accent-300">◆</span>
        <span>{profile.name}</span>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className="text-white/40">File</span>
        <span className="text-white/40">View</span>
        <span className="text-white/40">Help</span>
      </div>
      <div className="flex items-center gap-3">
        <Wifi className="h-3.5 w-3.5" />
        <Volume2 className="h-3.5 w-3.5" />
        <BatteryMedium className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{date}</span>
        <span className="font-mono tabular-nums text-white/90">
          {formatted}
        </span>
      </div>
    </div>
  );
}
