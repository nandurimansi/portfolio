import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Computer } from '@/components/Computer';
import { Desktop } from '@/components/Desktop';

type Phase = 'landing' | 'desktop';

export default function App() {
  const [phase, setPhase] = useState<Phase>('landing');

  return (
    <AnimatePresence mode="wait">
      {phase === 'landing' ? (
        <motion.div
          key="landing"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Computer onReady={() => setPhase('desktop')} />
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Desktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
