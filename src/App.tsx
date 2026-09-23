import { useState } from 'react';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import PhoneNumber from './screens/PhoneNumber';
import Complete from './screens/Complete';

type Step = 'splash' | 'welcome' | 'phone' | 'complete';

export default function App() {
  const [step, setStep] = useState<Step>('splash');

  return (
    <main className="app">
      {step === 'splash' && <Splash onDone={() => setStep('welcome')} />}
      {step === 'welcome' && (
        <Welcome
          onGoogle={() => setStep('phone')}
          onEmail={() => setStep('phone')}
        />
      )}
      {step === 'phone' && <PhoneNumber onContinue={() => setStep('complete')} />}
      {step === 'complete' && <Complete />}
    </main>
  );
}
