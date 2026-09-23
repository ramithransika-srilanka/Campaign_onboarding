import { useEffect, useState } from 'react';
import Screen from '../components/Screen';
import { SPLASH_DURATION_MS } from '../config';

export default function Splash({ onDone }: { onDone: () => void }) {
  const [logoMissing, setLogoMissing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(onDone, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <Screen>
      <div className="splash-logo">
        {logoMissing ? (
          <span className="splash-logo__fallback">CELESTE</span>
        ) : (
          <img
            src="/celeste-logo.png"
            alt="Celeste"
            onError={() => setLogoMissing(true)}
          />
        )}
      </div>
    </Screen>
  );
}
