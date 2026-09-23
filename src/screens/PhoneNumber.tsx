import { useRef, useState, type FormEvent } from 'react';
import Screen from '../components/Screen';

const COUNTRY_CODE = '+94';
const LOCAL_DIGITS = 9;

/** Keep digits only, drop a leading trunk 0 (e.g. 077…), cap at 9 digits. */
function toLocalNumber(value: string) {
  return value.replace(/\D/g, '').replace(/^0/, '').slice(0, LOCAL_DIGITS);
}

export default function PhoneNumber({ onContinue }: { onContinue: (phone: string) => void }) {
  const [digits, setDigits] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isValid = digits.length === LOCAL_DIGITS;
  const showPrefix = focused || digits.length > 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValid) onContinue(`${COUNTRY_CODE}${digits}`);
  };

  return (
    <Screen>
      <form className="phone" onSubmit={handleSubmit} noValidate>
        <p className="phone__title">You are almost there!</p>
        <div className="stack stack--12">
          <div className="input phone-field" onClick={() => inputRef.current?.focus()}>
            {showPrefix && <span className="phone-field__prefix">{COUNTRY_CODE}</span>}
            <input
              ref={inputRef}
              id="phone"
              className="phone-field__input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={LOCAL_DIGITS}
              placeholder={showPrefix ? '' : 'Enter your phone number'}
              aria-label={`Phone number, ${LOCAL_DIGITS} digits after ${COUNTRY_CODE}`}
              value={digits}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => setDigits(toLocalNumber(e.target.value))}
            />
          </div>
          <button type="submit" className="btn btn--primary" disabled={!isValid}>
            Continue
          </button>
        </div>
      </form>
    </Screen>
  );
}
