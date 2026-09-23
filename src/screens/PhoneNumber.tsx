import { useState, type FormEvent } from 'react';
import Screen from '../components/Screen';

const MIN_DIGITS = 7;

export default function PhoneNumber({ onContinue }: { onContinue: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const digits = phone.replace(/\D/g, '');
  const isValid = digits.length >= MIN_DIGITS;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValid) onContinue(phone.trim());
  };

  return (
    <Screen>
      <form className="phone" onSubmit={handleSubmit} noValidate>
        <p className="phone__title">You are almost there!</p>
        <div className="stack stack--12">
          <input
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            aria-label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d+\-() ]/g, ''))}
          />
          <button type="submit" className="btn btn--primary" disabled={!isValid}>
            Continue
          </button>
        </div>
      </form>
    </Screen>
  );
}
