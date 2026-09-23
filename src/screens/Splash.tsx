import { useEffect, useRef, useState } from 'react';
import Screen from '../components/Screen';
import { SPLASH_DURATION_MS, SPLASH_EXIT_MS } from '../config';

export default function Splash({ onDone }: { onDone: () => void }) {
  const [logoMissing, setLogoMissing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), SPLASH_DURATION_MS);
    const done = setTimeout(() => onDoneRef.current(), SPLASH_DURATION_MS + SPLASH_EXIT_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, []);

  return (
    <Screen>
      <div className={`splash-logo${leaving ? ' splash-logo--leaving' : ''}`}>
        {logoMissing ? (
          <span className="splash-logo__fallback">CELESTE</span>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}celeste-logo.png`}
            alt="Celeste"
            onError={() => setLogoMissing(true)}
          />
        )}
      </div>
    </Screen>
  );
}
